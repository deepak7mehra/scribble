import {WebSocket} from "ws";
import { Game } from "./Game";
import { Player } from "./Player";
export class GameManger{
    
    private connectedUser : WebSocket[];
    private games : Game[];
    private pendingUser : Player | null;

    constructor(){
        this.connectedUser = [];
        this.games = [];
        this.pendingUser = null;
    }

    addUser(socket:WebSocket){
        this.connectedUser.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket){
        const game : Game | undefined = this.games.find(g=>g.getPlayer1().getSocket()===socket || g.getPlayer2().getSocket()===socket)
        if (game){
            game.handleDisconnection()
        }

        this.connectedUser = this.connectedUser.filter(user=>user!==game?.getPlayer1().getSocket() || user!==game?.getPlayer2().getSocket());
        
    }

    private addHandler(socket: WebSocket){
        socket.on("message",(data)=>{
            const message = JSON.parse(data.toString());
            if (message.type === "INIT_GAME"){
                if (!this.pendingUser){
                    const player = new Player(socket);
                    this.pendingUser = player;
                    socket.send(JSON.stringify({
                        status:"pending"
                    }))
                }else {
                    const player = new Player(socket);
                    const game = new Game(this.pendingUser,player);
                    this.games.push(game);
                    socket.send(JSON.stringify({
                        status:"started"
                    }));
                    this.pendingUser.getSocket().send(JSON.stringify({
                        status:"started"
                    }))
                    this.pendingUser = null
                }
            }
            else if (message.type === "DRAW"){
                const game : Game | undefined = this.games.find(g=>g.getPlayer1().getSocket()===socket || g.getPlayer2().getSocket()===socket)
                const x = message.x;
                const y = message.y
                if (game){
                    game.manageDraw(x,y);
                }
            }
        })
    }

}