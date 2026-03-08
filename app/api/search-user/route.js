import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import connectionDB from "@/app/connectionDB/connection";
import User from "../../models/login.model";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(req) {
  try {
    await connectionDB();

    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ success: false });
    }

    const user = await User.findOne({
      username: { $regex: `^${username.trim()}$`, $options: "i" },
    });

    if (!user) {
      return NextResponse.json({ success: false });
    }

    // 🔥 Now this will work
    const clerkUser = await clerkClient.users.getUser(user.clerkId);

    return NextResponse.json({
      success: true,
      user: {
        clerkId: user.clerkId,
        username: user.username,
        email: clerkUser.emailAddresses[0].emailAddress,
        image: clerkUser.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}