"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(socket) {
        this.socket = socket;
        this.score = 0;
    }
    getSocket() {
        return this.socket;
    }
    getValue() {
        return this.score;
    }
}
exports.Player = Player;
