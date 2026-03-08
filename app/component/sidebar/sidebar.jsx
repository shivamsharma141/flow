"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Image,
  MessageCircle,
  Users,
  HelpCircle
} from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Intro", path: "/post", icon: LayoutDashboard },
    { name: "Dashboard", path: "/dashboard", icon: Image },
    { name: "Chats", path: "/chats", icon: MessageCircle },
    { name: "People", path: "/people", icon: Users },
    { name: "Help", path: "/help", icon: HelpCircle },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>Flow</h2>

          <button
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.icon}>
                  <Icon size={18} />
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.userSection}>
  <UserButton
    afterSignOutUrl="/signup"
    appearance={{
      elements: {
        avatarBox: {
          width: "38px",
          height: "38px",
          border: "2px solid #38bdf8",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.4)",
        }
      }
    }}
  />
</div>
      </div>

      <div className={styles.main}>
        <div className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
