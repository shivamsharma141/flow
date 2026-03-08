import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({

     senderid :{
        type: String,
     },
     receiverid : {
        type : String,
     }
     ,
     message : {
        type : String,
     },
     createdAt : {
        type : Date,
        default : Date.now,
     }


},{timestamps : true})

export default mongoose.models.MessageSchema || mongoose.model("message", MessageSchema)