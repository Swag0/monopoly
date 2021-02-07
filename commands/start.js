const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'start',
	description: 'Start\'s a game',
	execute(message, args, keyv, games) {

		let matchCode = 0;

		for (let i = 0; i < 100; i++) {
			if (games[i] == undefined) {
				matchCode = i;
				i = 100;
			}
		}

		games.push(new Match(matchCode, [new Player(message.author.id, 0, 0)]));

		if (message.mentions.users) {
			for (let i = 0; i < message.mentions.users.array().length; i++) {
				console.log(message.mentions.users.array()[i].id);
				games[matchCode].players.push(new Player(message.mentions.users.array()[i].id, 0, 0));
			}
		}

		(async () => {
			message.channel.send("Started a game in room " + matchCode + ".");
			await keyv.set('games', games);
		})();
	},
};