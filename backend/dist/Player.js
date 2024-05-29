"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(socket) {
        this.socket = socket;
        this.score = 0;
        this.turn = false;
    }
    getSocket() {
        return this.socket;
    }
    getScore() {
        return this.score;
    }
    setScore(val) {
        this.score += val;
    }
    getTurn() {
        return this.turn;
    }
    setTurn() {
        this.turn = !this.turn;
    }
}
exports.Player = Player;
