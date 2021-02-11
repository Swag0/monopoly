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

        let num1 = Math.floor((Math.random()*6)+1);
        let num2 = Math.floor((Math.random()*6)+1);

        let inGame = false;

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === message.author.id) {
                if (i != games[givenCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                if (games[givenCode].phase != "Roll") {
                    message.reply("It is not rolling phase anymore. It is " + games[givenCode].phase.toLowerCase() + "ing phase.");
                    return;
                }

                inGame = true;

                message.reply("You rolled a " + num1 + " and a " + num2 + ".");
                games[givenCode].players[i].position += (num1 + num2);

                if (num1 === num2) message.channel.send("You rolled doubles, so you get another roll.");
                else if (i + 1 === games[givenCode].players.length)  {
                    //games[givenCode].turn = 0;
                    games[givenCode].phase = "Buy"
                }
                else {
                    //games[givenCode].turn++;
                    games[givenCode].phase = "Buy"
                }

                if (games[givenCode].players[i].position > 39) {
                    games[givenCode].players[i].position = (games[givenCode].players[i].position % 40);
                    games[givenCode].players[i].money += 5;
                    message.channel.send("You passed GO.");
                }
            }
        }

        if (!inGame) message.channel.send("You are not in that game.");

        

		(async () => {
            await keyv.set('games', games);
		})();
	},
};