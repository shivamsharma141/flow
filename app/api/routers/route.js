import { NextResponse } from "next/server";
import connectionDB from "../../connectionDB/connection";
import Usermodel from "../../models/login.model";

export async function POST(req) {
  try {
    await connectionDB();

    const data = await req.json();
    let { clerkId, firstname, lastname, email, username, image } = data;
    console.log(clerkId, firstname, lastname, email, username , image);
    if (!username && email) {
      username = email.split("@")[0];
    }

    const userexist = await Usermodel.findOne({ clerkId });

    if (!userexist) {
      await Usermodel.create({
        clerkId,
        firstname,
        lastname,
        email,
        username,
        image
      });
    }

    return NextResponse.json({
      message: "User saved successfully"
    });

  } catch (error) {
    console.log("API Error :", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}