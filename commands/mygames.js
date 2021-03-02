const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'mygames',
	description: 'Shows all games in progress',
	execute(message, args, keyv, games) {

        let gameAmt = 0;
        let i = 0;

        while (true) {
			if (games[i] == undefined) {
                gameAmt = i;
				break;
            }
            i++;
        }

        if (gameAmt === 0) {
            message.reply("You aren't in any games right now.");
            return;
        }

        let yourGames = [];

        for (let i = 0; i < gameAmt; i++) {
            if (games[i].IsPlayerInGame(message.author.id)) {
                yourGames.push(i);
            }
        }

        let text = "";
        for (let i = 0; i < yourGames.length; i++) {
            if (i === yourGames.length - 1) {
                text += yourGames[i];
            } else {
                text += yourGames[i] + ", ";
            }
        }

        message.channel.send("You are in games " + text + ".");
	},
};