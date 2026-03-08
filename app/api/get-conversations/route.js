import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import connectDB from "@/app/connectionDB/connection";
import Message from "@/app/models/message.model";

export async function GET() {
  await connectDB();

  // Logged in user ka ID lo
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false });

  // Us user ke saare messages lo - latest pehle
  const allMessages = await Message.find({
    $or: [{ senderid: userId }, { receiverid: userId }]
  }).sort({ createdAt: -1 });

  // Har unique conversation ka sirf last message rakho
  const seen = {};
  const conversations = [];

  for (const msg of allMessages) {
    const otherId = msg.senderid === userId ? msg.receiverid : msg.senderid;
    if (!seen[otherId]) {
      seen[otherId] = true;
      conversations.push({
        userId:      otherId,
        lastMessage: msg.message,
        time:        new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit", minute: "2-digit"
        }),
      });
    }
  }

  // Clerk se name aur image lo
  const client = await clerkClient();

  const result = await Promise.all(
    conversations.map(async (conv) => {
      try {
        const clerkUser = await client.users.getUser(conv.userId);
        return {
          ...conv,
          name:  clerkUser.fullName || clerkUser.username || "Unknown",
          image: clerkUser.imageUrl || null,
        };
      } catch {
        return { ...conv, name: "Unknown", image: null };
      }
    })
  );

  return NextResponse.json({ success: true, conversations: result });
}