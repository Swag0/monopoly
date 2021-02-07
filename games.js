class Match{
    matchID;
    players;
    turn;

    constructor(matchID = 0, players = [], turn = 0) {
        this.matchID = matchID;
        this.players = players;
        this.turn = turn;
    }
}

module.exports = Match;