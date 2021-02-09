class Match{
    matchID;
    players;
    turn;

    constructor(matchID = 0, players = [], turn = 0) {
        this.matchID = matchID;
        this.players = players;
        this.turn = turn;
    }

    IsPlayerInGame(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                return true;
            }
        }
        return false;
    }
}

module.exports = Match;