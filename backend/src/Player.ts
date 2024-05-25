import {WebSocket} from "ws";
export class Player{
    private socket : WebSocket;
    private score : number;
    
    constructor(socket:WebSocket){
        this.socket = socket;
        this.score = 0;
    }

    getSocket(){
        return this.socket;
    }

    getValue(){
        return this.score;
    }


}