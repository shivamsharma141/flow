import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectionDB from "@/app/connectionDB/connection";
import User from "@/app/models/login.model";

export async function POST(req) {
  try {
    await connectionDB();

    const { userId } = await auth();
    console.log("Logged in userId:", userId);

    const { friendClerkId } = await req.json();
    console.log("Friend ClerkId:", friendClerkId);

    if (!userId || !friendClerkId) {
      console.log("Missing userId or friendClerkId");
      return NextResponse.json({ success: false });
    }

    const currentUser = await User.findOne({ clerkId: userId });
    console.log("Current User from DB:", currentUser);

    if (!currentUser) {
      console.log("Current user not found in DB");
      return NextResponse.json({ success: false });
    }

    if (!currentUser.friends) {
      currentUser.friends = [];
    }

    if (!currentUser.friends.includes(friendClerkId)) {
      currentUser.friends.push(friendClerkId);
      await currentUser.save();
      console.log("Friend added successfully");
    } else {
      console.log("Already friend");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.log("ERROR:", error);
    return NextResponse.json({ success: false });
  }
}