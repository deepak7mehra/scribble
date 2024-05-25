import express from "express";
const app = express();
import httpServer from 'http';
const server  = httpServer.createServer(app);
import { WebSocketServer } from "ws";
import { GameManger } from "./GameManager";
import WebSocket from "ws"




const wss = new WebSocketServer({server:server});

const gameManger = new GameManger();
wss.on('connection',(ws)=>{

   
    ws.on('error', console.error);
    console.log("an user had been added")
    gameManger.addUser(ws);

    ws.on('close',()=>{
        gameManger.removeUser(ws);
    })
   


    
    


    

   
})


app.get("/",(req,res)=>{
    res.send("hi there")
})


server.listen(8080,()=>{
    console.log("listening to port 8080")
})