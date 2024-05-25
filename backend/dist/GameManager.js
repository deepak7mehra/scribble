"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManger = void 0;
const Game_1 = require("./Game");
const Player_1 = require("./Player");
class GameManger {
    constructor() {
        this.connectedUser = [];
        this.games = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.connectedUser.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        const game = this.games.find(g => g.getPlayer1().getSocket() === socket || g.getPlayer2().getSocket() === socket);
        if (game) {
            game.handleDisconnection();
        }
        this.connectedUser = this.connectedUser.filter(user => user !== (game === null || game === void 0 ? void 0 : game.getPlayer1().getSocket()) || user !== (game === null || game === void 0 ? void 0 : game.getPlayer2().getSocket()));
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === "INIT_GAME") {
                if (!this.pendingUser) {
                    const player = new Player_1.Player(socket);
                    this.pendingUser = player;
                    socket.send(JSON.stringify({
                        status: "pending"
                    }));
                }
                else {
                    const player = new Player_1.Player(socket);
                    const game = new Game_1.Game(this.pendingUser, player);
                    this.games.push(game);
                    socket.send(JSON.stringify({
                        status: "started"
                    }));
                    this.pendingUser.getSocket().send(JSON.stringify({
                        status: "started"
                    }));
                    this.pendingUser = null;
                }
            }
            else if (message.type === "DRAW") {
                const game = this.games.find(g => g.getPlayer1().getSocket() === socket || g.getPlayer2().getSocket() === socket);
                const x = message.x;
                const y = message.y;
                if (game) {
                    game.manageDraw(x, y);
                }
            }
        });
    }
}
exports.GameManger = GameManger;
