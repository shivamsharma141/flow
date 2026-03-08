import mongoose from "mongoose";
import { Server } from "socket.io";
import connectionDB from "./app/connectionDB/connection.js"
import message from "./app/models/message.model.js"
import http from "http";
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]  
    }
})

connectionDB();

let onlineuser = {};

io.on("connection", (socket) => {
    console.log(" User connected, socket id:", socket.id)

    // EVENT 1: User online hua
    socket.on("user-online", (userId) => {
        onlineuser[userId] = socket.id;
        console.log(" Online hua:", userId)
        io.emit("online-users", Object.keys(onlineuser));
    })

    // EVENT 2: Message bheja
    socket.on("send-message", async (data) => {
    const { senderid, receiverid, message: textMessage, sendername, senderimage } = data;

    const newmessage = new message({
      senderid,
      receiverid,
      message: textMessage
    });

    await newmessage.save();

    const receiversocketid = onlineuser[receiverid];
    if (receiversocketid) {
      io.to(receiversocketid).emit("receive-message", {
        senderid,
        sendername,
        senderimage,
        message: textMessage
      });
    }
});

    // EVENT 3: Purane messages load karo
    socket.on("load-messages", async (data) => {

        const messages = await message.find({
            $or: [
                { senderid: data.userId1, receiverid: data.userId2 },  
                { senderid: data.userId2, receiverid: data.userId1 }   
            ]
        }).sort({ createdAt: 1 })

        socket.emit("messages-loaded", messages);
        console.log(`📚 ${messages.length} messages bheje`)
    })

    // EVENT 4: User disconnect hua
    socket.on("disconnect", () => {  

        let userdisconnected = null;

        for (let userId in onlineuser) {
            if (onlineuser[userId] === socket.id) {
                userdisconnected = userId;
                break;
            }
        }

        if (userdisconnected) {
            delete onlineuser[userdisconnected];
            console.log(" Offline ho gaya:", userdisconnected)
            io.emit("online-users", Object.keys(onlineuser));
        }
    })

})

server.listen(4000, () => {
    console.log(" Server chal raha hai port 4000 pe!")
})