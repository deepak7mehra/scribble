"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const util_1 = require("./util");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.rounds = 2;
        this.choosenWord = "";
        this.attempts = 10;
        this.currRoundScore = 1000;
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer2() {
        return this.player2;
    }
    rr() {
    }
    runGame() {
        // send the three words
        const words = (0, util_1.threeWords)();
        if (this.player1.getTurn()) {
            this.player1.getSocket().send(JSON.stringify({ status: "SEL_WORD", words }));
        }
        else {
            this.player1.getSocket().send(JSON.stringify({ status: "started" }));
        }
        if (this.player2.getTurn()) {
            this.player2.getSocket().send(JSON.stringify({ status: "SEL_WORD", words }));
        }
        else {
            this.player2.getSocket().send(JSON.stringify({ status: "started" }));
        }
        this.attempts = 9;
        this.currRoundScore = 1000;
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
    setWord(word) {
        this.choosenWord = word;
        this.player1.getSocket().send(JSON.stringify({
            status: "WORD_SET"
        }));
        this.player2.getSocket().send(JSON.stringify({
            status: "WORD_SET"
        }));
        console.log(this.choosenWord);
    }
    checkWord(word, socket) {
        if (this.choosenWord === "")
            return;
        if (this.player1.getSocket() === socket && this.player1.getTurn())
            return;
        if (this.player2.getSocket() === socket && this.player2.getTurn())
            return;
        if (this.choosenWord === word) {
            this.rounds--;
            if (!this.player1.getTurn())
                this.player1.setScore(this.currRoundScore);
            if (!this.player2.getTurn())
                this.player2.setScore(this.currRoundScore);
            if (this.rounds > 0) {
                this.choosenWord = "";
                this.player1.setTurn();
                this.player2.setTurn();
                this.runGame();
            }
            else {
                console.log("game over");
                console.log("score of player1 = " + this.player1.getScore());
                console.log("score of player2 =" + this.player2.getScore());
                this.handleDisconnection();
            }
        }
        else {
            this.attempts--;
            this.currRoundScore = this.currRoundScore - 100;
            if (this.attempts === 0) {
                this.handleDisconnection();
            }
        }
    }
}
exports.Game = Game;
