const Player = require('../player.js');
const Match = require('../games.js');
const end = require('./end.js');

module.exports = {
	name: 'ff',
	description: 'Forfeits game',
	execute(message, args, keyv, games) {

        this.Lose(message, args, games, message.author.id);
        
	},

    Lose(message, args, games, loseID) {
        if (args[0] === undefined) return;

        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === loseID) {
                if (i != games[givenCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }
            }
        }

        if (games[givenCode].IsPlayerInGame(loseID)) {
            message.channel.send("You quit this game.");
            for (let i = 0; i < 40; i++) {
                let curPlace = games[givenCode].GetPlace(i);
                if (curPlace.owner < 0) {
                    continue;
                }
                if (games[givenCode].players[curPlace.owner].id === loseID) {
                    curPlace.owner = -1;
                }
            }
        } else {
            message.channel.send("You aren't in that game.");
            return;
        }

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === loseID) {
                
                games[givenCode].phase = "Buy"
                end.EndTurn(message, args, games, true);

                games[givenCode].players[i].id = "-";
                games[givenCode].players[i].position = 41;
            }
        }

        let peopleInGame = 0;
        let lastOne = "";
        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id != "-") {
                peopleInGame++;
                lastOne = games[givenCode].players[i].id;
            }
        }

        if (peopleInGame <= 1) {
            message.channel.send(`**Game Over! <@${lastOne}> wins.**`);
            games.splice(givenCode, givenCode+1)
        }
    }
};