import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import userRoute from "./route/user.route.js"
import messageRoute from "./route/message.route.js"
import { app, server} from './SocketIO/server.js';



dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 5002;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI)
    console.log("Connected to MongoDB")
}   catch (error) { 
    console.log("MongoDB connection error:", error);
}

app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

// --------------- code for deployment --------------------

if (process.env.NODE_ENV === 'production') {
    const dirPath =  path.resolve();
    app.use(express.static("./frontend/dist"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(dirPath, './frontend/dist','index.html'));
    });
}

server.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})
