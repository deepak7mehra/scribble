import {WebSocket} from "ws";
export class Player{
    private socket : WebSocket;
    private score : number;
    private turn : boolean;
    
    constructor(socket:WebSocket){
        this.socket = socket;
        this.score = 0;
        this.turn = false;
    }

    getSocket(){
        return this.socket;
    }

    getValue(){
        return this.score;
    }

    getTurn(){
        return this.turn;
    }

    setTurn(){
        this.turn = true;
    }


}