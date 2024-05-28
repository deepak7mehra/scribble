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
    getValue() {
        return this.score;
    }
    getTurn() {
        return this.turn;
    }
    setTurn() {
        this.turn = true;
    }
}
exports.Player = Player;
