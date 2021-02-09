const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'roll',
	description: 'Rolls a dice to change position',
	execute(message, args, keyv, games) {

        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let num = Math.round((Math.random()*6)+1);

        let inGame = false;

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === message.author.id) {
                if (i != games[givenCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                inGame = true;

                message.reply("You rolled a " + num + ".");
                console.log(games[givenCode].players[i].position);
                games[givenCode].players[i].position += num;
                if (i + 1 === games[givenCode].players.length) games[givenCode].turn = 0;
                else games[givenCode].turn++;
            }
        }

        if (!inGame) message.channel.send("You are not in that game.");

		(async () => {
            
            await keyv.set('games', games);
		})();
	},
};