"use client";
import { io } from "socket.io-client";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./chats.module.css";

export default function Chat() {

  const { user } = useUser();
  const searchParams = useSearchParams();
  const socketRef = useRef(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketReady, setSocketReady] = useState(false);
  const [search, setSearch] = useState("");
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const [users, setUsers] = useState([]);

  // Socket initialize
  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000");

    socketRef.current.on("connect", () => setSocketReady(true));
    if (socketRef.current.connected) setSocketReady(true);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const image = searchParams.get("image");
    if (userId && name) {
      setSelectedUser({ id: userId, name, image });
      setUsers([{ id: userId, name, image, online: false, lastMessage: "", time: "" }]);
    }
  }, []);

  useEffect(() => {
    if (!user || !socketRef.current) return;
    socketRef.current.emit("user-online", user.id);
  }, [user?.id, socketReady]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("online-users", (onlineIds) => {
      setUsers((prev) =>
        prev.map((u) => ({ ...u, online: onlineIds.includes(u.id) }))
      );
    });
    return () => socketRef.current?.off("online-users");
  }, [socketReady]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("receive-message", (newMsg) => {
      setSelectedUser((prev) => {
        if (!prev) {
          return { id: newMsg.senderid, name: newMsg.sendername, image: newMsg.senderimage };
        }
        return prev;
      });
      setUsers((prev) => {
        const exists = prev.find((u) => u.id === newMsg.senderid);
        if (exists) return prev;
        return [...prev, {
          id: newMsg.senderid,
          name: newMsg.sendername,
          image: newMsg.senderimage,
          online: true,
          lastMessage: newMsg.message,
          time: getTime(),
        }];
      });
      setMessages((prev) => [
        ...prev,
        { text: newMsg.message, sender: "them", time: getTime() }
      ]);
    });
    return () => socketRef.current?.off("receive-message");
  }, [socketReady]);

  useEffect(() => {
    if (!selectedUser || !user || !socketReady || !socketRef.current) return;
    socketRef.current.emit("load-messages", { userId1: user.id, userId2: selectedUser.id });
    socketRef.current.on("messages-loaded", (oldMessages) => {
      setMessages(
        oldMessages.map((m) => ({
          text: m.message,
          sender: m.senderid === user.id ? "me" : "them",
          time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }))
      );
    });
    return () => socketRef.current?.off("messages-loaded");
  }, [selectedUser?.id, user?.id, socketReady]);

  // Reload pe conversations load karo
  useEffect(() => {
    if (!user) return;

    fetch("/api/get-conversations")
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return;

        setUsers((prev) => {
          const updated = [...prev];

          data.conversations.forEach((conv) => {
            const exists = updated.find((u) => u.id === conv.userId);

            if (!exists) {
              updated.push({
                id:          conv.userId,
                name:        conv.name,
                image:       conv.image,
                online:      false,
                lastMessage: conv.lastMessage,
                time:        conv.time,
              });
            } else {
              const idx = updated.findIndex((u) => u.id === conv.userId);
              updated[idx] = {
                ...updated[idx],
                name:        conv.name,
                image:       conv.image,
                lastMessage: conv.lastMessage,
                time:        conv.time,
              };
            }
          });

          return updated;
        });
      });
  }, [user?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  }, [message]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const sendMessage = () => {
    if (!message.trim() || !selectedUser || !user || !socketRef.current) return;
    socketRef.current.emit("send-message", {
      senderid: user.id,
      receiverid: selectedUser.id,
      message: message,
      sendername: user.fullName,
      senderimage: user.imageUrl,
    });
    const newMsg = { text: message, sender: "me", time: getTime() };
    setMessages((prev) => [...prev, newMsg]);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, lastMessage: message, time: newMsg.time }
          : u
      )
    );
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${selectedUser ? styles.hideMobile : ""}`}>
        <h2 className={styles.title}>Chats</h2>

        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchBar}
        />

        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className={`${styles.user} ${selectedUser?.id === u.id ? styles.activeUser : ""}`}
            onClick={() => { setSelectedUser(u); setMessages([]); }}
          >
            <div className={styles.avatarWrapper}>
              {u.image
                ? <img src={u.image} className={styles.avatarImg} alt="profile" />
                : <div className={styles.avatar}>{u.name?.charAt(0)}</div>
              }
              {u.online && <span className={styles.onlineDot}></span>}
            </div>

            <div className={styles.userContent}>
              <div className={styles.topRow}>
                <span className={styles.userName}>{u.name}</span>
                <span className={styles.time}>{u.time}</span>
              </div>
              <div className={styles.lastMessage}>
                {u.lastMessage || "Start a conversation"}
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className={styles.noResults}>No chats found</p>
        )}
      </div>

      <div className={`${styles.chatArea} ${!selectedUser ? styles.hideMobile : ""}`}>
        {selectedUser && (
          <>
            <div className={styles.header}>
              <button className={styles.backBtn} onClick={() => setSelectedUser(null)}>←</button>
              <div className={styles.avatarWrapper}>
                {selectedUser.image
                  ? <img src={selectedUser.image} className={styles.headerImg} alt="profile" />
                  : <div className={styles.avatarSmall}>{selectedUser.name?.charAt(0)}</div>
                }
                {selectedUser.online && <span className={styles.onlineDot}></span>}
              </div>
              <div>
                <h3 className={styles.headerName}>{selectedUser.name}</h3>
              </div>
            </div>

            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <div key={i} className={msg.sender === "me" ? styles.right : styles.left}>
                  <div>{msg.text}</div>
                  <span className={styles.msgTime}>{msg.time}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className={styles.inputArea}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className={styles.textInput}
              />
              <button className={styles.sendBtn} onClick={sendMessage}>➤</button>
            </div>
          </>
        )}

        {!selectedUser && (
          <div className={styles.emptyChat}>
            <p>👈 Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}