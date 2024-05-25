"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer2() {
        return this.player2;
    }
    manageDraw(x, y) {
        this.player1.getSocket().send(JSON.stringify({
            x: x,
            y: y
        }));
        this.player2.getSocket().send(JSON.stringify({
            x: x,
            y: y
        }));
    }
    handleDisconnection() {
        this.player1.getSocket().send(JSON.stringify({
            status: "GAMEOVER"
        }));
        this.player2.getSocket().send(JSON.stringify({
            status: "GAMEOVER"
        }));
        this.player1.getSocket().close();
        this.player2.getSocket().close();
    }
}
exports.Game = Game;
