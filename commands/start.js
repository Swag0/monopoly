const Player = require('../player.js');
const Place = require('../place.js');
const Match = require('../games.js');

module.exports = {
	name: 'start',
	description: 'Start\'s a game',
	execute(message, args, keyv, games) {

		let matchCode = 0;
		let i = 0;

		while (true) {
			if (games[i] == undefined) {
				matchCode = i;
				break;
			}
			i++;
		}

		if (message.mentions.users) {
			for (let i = 0; i < message.mentions.users.array().length; i++) { //Check if works
				if (message.mentions.users.array()[i].bot) {
					message.channel.send("You can't play with a bot.");
					return;
				}
				if (message.mentions.users.array()[i].id === message.author.id) {
					message.channel.send("You can't play with yourself.");
					return;
				}
				for (let j = 0; j < message.mentions.users.array().length; j++) {
					if (message.mentions.users.array()[i].id === message.mentions.users.array()[j].id) {
						if (i != j) {
							message.channel.send("You can't have duplicates.");
							return;
						}
					}
				}
			}

			if (message.mentions.users.array().length < 1) {
				message.channel.send("You need to play with someone else.");
				return;
			}

			if (message.mentions.users.array().length > 6) { //6 Player Game (Max)
				message.channel.send("You are playing with too many people.");
				return;
			}

			games.push(new Match(matchCode, [new Player(message.author.id, 0, 10)], 0, "Roll")); //Adds player 1

			for (let i = 0; i < message.mentions.users.array().length; i++) { //Add other players 
				//console.log(message.mentions.users.array()[i].id);
				games[matchCode].players.push(new Player(message.mentions.users.array()[i].id, 0, 10));
			}
		}
		

		(async () => {
			message.channel.send("Started a game in room " + matchCode + ".");
			await keyv.set('games', games);
		})();
	},
};