"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!user) return;
    const saveUser = async () => {
      await fetch("/api/routers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0],
        }),
      });
    };
    saveUser();
  }, [user]);

  if (!isLoaded || !user) return null;

  return (
    <div className={styles.container}>

      {/* HERO */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Hey, <span className={styles.glow}>{user.firstName}!</span> 👋
        </h1>
        <p className={styles.heroSub}>Welcome back to your Flow space ✨</p>
      </div>

      {/* PROFILE CARD */}
      <div className={styles.profileCard}>
        <div className={styles.avatarWrapper}>
          <img src={user.imageUrl} className={styles.avatar} alt="profile" />
          <span className={styles.activeBadge}>🟢 Online</span>
        </div>

        <div className={styles.profileInfo}>
          <h2 className={styles.fullName}>{user.fullName}</h2>
          <p className={styles.username}>@{user.username}</p>
          <p className={styles.email}>{user.primaryEmailAddress?.emailAddress}</p>

          <div className={styles.tagRow}>
            <span className={styles.tag}>💬 Chatter</span>
            <span className={styles.tag}>🔥 Active</span>
            <span className={styles.tag}>✨ Flow User</span>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div className={styles.infoGrid}>

        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🚀</span>
          <h3>Start Chatting</h3>
          <p>Go to People tab, search your friend by username and start a conversation!</p>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🔒</span>
          <h3>Private & Secure</h3>
          <p>Your messages are only visible to you and the person you are chatting with.</p>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>⚡</span>
          <h3>Real Time</h3>
          <p>Messages are delivered instantly using Socket.io - no refresh needed!</p>
        </div>

        <div className={styles.infoCard}>
          <span className={styles.infoIcon}>🌍</span>
          <h3>Always Connected</h3>
          <p>Stay connected with your friends anytime, anywhere on any device.</p>
        </div>

      </div>

      {/* QUOTE */}
      <div className={styles.quoteBox}>
        <p>💡 "The best way to stay connected is to just say hello."</p>
      </div>

    </div>
  );
}