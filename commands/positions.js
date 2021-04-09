const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'positions',
	description: 'Says each players positions in ID',
	execute(message, args, keyv, games) {

        if (args[0] === undefined) return;

        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let text = "";

        for (let i = 1; i < games[givenCode].players.length; i++) {
            text += `, <@${games[givenCode].players[i].id}>: ${games[givenCode].players[i].boardPosition}`
        }
		(async () => {
            message.channel.send(`In room ${givenCode}, <@${games[givenCode].players[0].id}>: ${games[givenCode].players[0].boardPosition}${text}.`)
            await keyv.set('games', games);
		})();
	},
};