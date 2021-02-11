const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'end',
	description: 'Ends your turn',
	execute(message, args, keyv, games) {

        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }
        
        let inGame = false;

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === message.author.id) {
                if (i != games[givenCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                if (games[givenCode].phase != "Buy") {
                    message.reply("It is not buying phase. It is " + games[givenCode].phase.toLowerCase() + "ing phase.");
                    return;
                }

                if (i + 1 === games[givenCode].players.length)  {
                    games[givenCode].turn = 0;
                    games[givenCode].phase = "Roll"
                } else {
                    games[givenCode].turn++;
                    games[givenCode].phase = "Roll"
                }
                

                message.channel.send(`Turn ended. It is <@${games[givenCode].players[games[givenCode].turn].id}>'s turn now.`);
                

                inGame = true;

            }
        }

        if (!inGame) message.channel.send("You are not in that game.");

        

		(async () => {
            await keyv.set('games', games);
		})();
	},
};