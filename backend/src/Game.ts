
import { Player } from "./Player";
export class Game{
    private player1 : Player
    private player2 : Player

    constructor(player1:Player,player2:Player){
        this.player1 = player1;
        this.player2 = player2;
    }
    getPlayer1():Player{
        return this.player1;
    }
    getPlayer2():Player{
        return this.player2;
    }

    manageDraw(x:any,y:any){
        this.player1.getSocket().send(JSON.stringify({
            x:x,
            y:y
        }))
            
        this.player2.getSocket().send(JSON.stringify({
            x:x,
            y:y
        }));
    }

    handleDisconnection(){
        this.player1.getSocket().send(JSON.stringify({
            status:"GAMEOVER"
        }))

        this.player2.getSocket().send(JSON.stringify({
            status:"GAMEOVER"
        }))

        this.player1.getSocket().close()
        this.player2.getSocket().close();
    }

}