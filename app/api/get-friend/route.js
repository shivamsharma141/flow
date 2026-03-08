import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";
import connectionDB from "@/app/connectionDB/connection";
import User from "@/app/models/login.model";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET() {
  try {
    await connectionDB();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false });
    }

    const currentUser = await User.findOne({ clerkId: userId });

    if (!currentUser || !currentUser.friends.length) {
      return NextResponse.json({ success: true, friends: [] });
    }

    // 🔥 Fetch full data from Clerk
    const friendsData = await Promise.all(
      currentUser.friends.map(async (clerkId) => {
        const clerkUser = await clerkClient.users.getUser(clerkId);

        return {
          clerkId,
          username: clerkUser.username,
          email: clerkUser.emailAddresses[0].emailAddress,
          image: clerkUser.imageUrl,
        };
      })
    );

    return NextResponse.json({
      success: true,
      friends: friendsData,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}