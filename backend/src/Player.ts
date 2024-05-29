import {WebSocket} from "ws";
export class Player{
    private socket : WebSocket;
    private score : number;
    private turn : boolean; // turn to draw
    
    constructor(socket:WebSocket){
        this.socket = socket;
        this.score = 0;
        this.turn = false;
    }

    getSocket(){
        return this.socket;
    }

    getScore(){
        return this.score;
    }

    setScore(val:number){
        this.score += val;
    }

    getTurn(){
        return this.turn;
    }

    setTurn(){
        this.turn = !this.turn
    }


}