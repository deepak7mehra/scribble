"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ server: server });
const gameManger = new GameManager_1.GameManger();
wss.on('connection', (ws) => {
    ws.on('error', console.error);
    console.log("an user had been added");
    gameManger.addUser(ws);
    ws.on('close', () => {
        gameManger.removeUser(ws);
    });
});
app.get("/", (req, res) => {
    res.send("hi there");
});
server.listen(8080, () => {
    console.log("listening to port 8080");
});
