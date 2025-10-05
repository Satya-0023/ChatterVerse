import { Server } from "socket.io";
import  http  from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://chatterverse-6hcp.onrender.com/"],
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) =>{
    return users[receiverId];
}




const users = {};

io.on("connection", (socket) => {
    console.log(`New client Connected : ${socket.id}`);

    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId] = socket.id;
        console.log(users); 
    }

    io.emit("getonline", Object.keys(users));

    socket.on("disconnect", () => {
        console.log(`client Disconnected : ${socket.id}`);
        delete users[userId];
        io.emit("getonline", Object.keys(users));
    });
});

export { app, io, server };