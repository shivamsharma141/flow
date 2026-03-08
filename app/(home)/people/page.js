"use client";

import { useState, useEffect } from "react";
import styles from "./people.module.css";
import { useRouter } from "next/navigation"; // ✅ ADD

export default function PeoplePage() {
  const router = useRouter(); // ✅ ADD
  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const [friends, setFriends] = useState([]);

  const handleSearch = async () => {
    if (!search) return;
    const res = await fetch("/api/search-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: search }),
    });
    const data = await res.json();
    if (data.success) {
      setSearchedUser(data.user);
    } else {
      setSearchedUser(null);
      alert("User not found");
    }
  };

  const addFriend = async () => {
    if (!searchedUser) return;
    try {
      const res = await fetch("/api/add-friend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendClerkId: searchedUser.clerkId }),
      });
      const data = await res.json();
      if (data.success) {
        await loadFriends();
        setSearchedUser(null);
        setSearch("");
      } else {
        alert("Failed to add friend ❌");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadFriends = async () => {
    const res = await fetch("/api/get-friend");
    const data = await res.json();
    if (data.success) {
      setFriends(data.friends);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  // ✅ ADD - Chat page pe jao friend ka data lekar
  const openChat = (friend) => {
    router.push(`/chats?userId=${friend.clerkId}&name=${friend.username}&image=${friend.image}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Friends</h1>

        <input
          type="text"
          placeholder="Search by full username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={styles.searchInput}
        />

        {searchedUser && (
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <img src={searchedUser.image} className={styles.profileImg} alt="profile" />
              <div className={styles.userInfo}>
                <span className={styles.title}>Username</span>
                <h3>{searchedUser.username}</h3>
                <span className={styles.title}>Email</span>
                <p>{searchedUser.email}</p>
              </div>
            </div>
            <div className={styles.cardButtons}>
              <button className={styles.addButton} onClick={addFriend}>
                + Add Friend
              </button>
            </div>
          </div>
        )}

        <h2 className={styles.sectionTitle}>Your Friends ({friends.length})</h2>

        <div className={styles.cardGrid}>
          {friends.map((friend, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardTop}>
                <img src={friend.image} className={styles.profileImg} alt="profile" />
                <div className={styles.userInfo}>
                  <span className={styles.title}>Username</span>
                  <h3>{friend.username}</h3>
                  <span className={styles.title}>Email</span>
                  <p>{friend.email}</p>
                </div>
              </div>
              <div className={styles.cardButtons}>
                {/* ✅ UPDATED - ab chat page pe jayega */}
                <button className={styles.messageBtn} onClick={() => openChat(friend)}>
                  💬 Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}