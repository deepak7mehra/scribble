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
    manageDraw(x, y, socket) {
        if (this.player1.getSocket() === socket && this.player1.getTurn() === false)
            return;
        if (this.player2.getSocket() === socket && this.player2.getTurn() == false)
            return;
        this.player1.getSocket().send(JSON.stringify({
            type: "DRAW",
            x: x,
            y: y
        }));
        this.player2.getSocket().send(JSON.stringify({
            type: "DRAW",
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
    penup() {
        this.player1.getSocket().send(JSON.stringify({
            type: "PENUP",
        }));
        this.player2.getSocket().send(JSON.stringify({
            type: "PENUP",
        }));
    }
    pendown(x, y) {
        this.player1.getSocket().send(JSON.stringify({
            type: "PENDOWN",
            x: x,
            y: y
        }));
        this.player2.getSocket().send(JSON.stringify({
            type: "PENDOWN",
            x: x,
            y: y
        }));
    }
    changeEraser() {
        this.player1.getSocket().send(JSON.stringify({
            type: "CHANGEERASER",
        }));
        this.player2.getSocket().send(JSON.stringify({
            type: "CHANGEERASER",
        }));
    }
    chnagePencil() {
        this.player1.getSocket().send(JSON.stringify({
            type: "CHANGEPENCIL",
        }));
        this.player2.getSocket().send(JSON.stringify({
            type: "CHANGEPENCIL",
        }));
    }
}
exports.Game = Game;
