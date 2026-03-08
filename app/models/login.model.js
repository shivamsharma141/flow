import mongoose from "mongoose";

const Usermodel = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true, // ✅ fixed
      unique: true,
    },

    username: {
      type: String,
    },

    firstname: {
      type: String,
    },

    lastname: {
      type: String,
    },

    email: {
      type: String,
    },

    image: {
      type: String,
    },

   
    friends: [
      {
        type: String, 
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", Usermodel);