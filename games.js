class Match{
    matchID;
    players;
    turn;
    phase; //Rolling phase and buying phase

    constructor(matchID = 0, players = [], turn = 0, phase = "Roll") {
        this.matchID = matchID;
        this.players = players;
        this.turn = turn;
        this.phase = phase;
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