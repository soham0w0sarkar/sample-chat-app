import express from 'express';
import {Server} from "socket.io";
import cors from "cors";
import http from 'http';

const app = express();

//1 - Create server using http
const server = http.createServer(app);

//2 - Create socket server
const io = new Server(server, {
    cors:{
        origin:'*',
        methods:["GET","POST"]
    }
});

//3 - Use Socket Events
io.on('connection',(socket)=>{
    console.log("Connection is established");

    socket.on('join',(username)=>{
        socket.username = username;
    });

    socket.on('new_message',(message)=>{

        let userMessage = {
            username:socket.username,
            message:message
        }

        socket.broadcast.emit('broadcast_message',userMessage);
    });

    socket.on("disconnect",()=>{
        console.log("Connection Disconnected");
    });

});

server.listen(8080,()=>{
    console.log("Server is running on 8080");
})

