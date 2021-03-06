const Player = require('../player.js');
const Match = require('../games.js');
const ff = require('./ff.js');

module.exports = {
	name: 'roll',
	description: 'Rolls a dice to change position',
	execute(message, args, keyv, games) {

        if (args[0] === undefined) return;

        var gameCode = parseInt(args, 10);

        if (games[gameCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let num1 = Math.floor((Math.random()*6)+1);
        let num2 = Math.floor((Math.random()*6)+1);

        let inGame = false;

        for (let i = 0; i < games[gameCode].players.length; i++) {
            if (games[gameCode].players[i].id === message.author.id) {
                if (i != games[gameCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                if (!games[gameCode].phase.includes("Roll")) {
                    message.reply("It is not rolling phase anymore. It is " + games[gameCode].phase.toLowerCase() + "ing phase.");
                    return;
                }

                inGame = true;

                message.reply("You rolled a " + num1 + " and a " + num2 + ".");
                games[gameCode].players[i].position += (num1 + num2);

                


                if (games[gameCode].players[i].position > 39) {
                    games[gameCode].players[i].position = (games[gameCode].players[i].position % 40);
                    games[gameCode].players[i].money += 10;
                    message.channel.send("You passed GO.");
                }

                //rent = 1/3 price
                /** @type {Player} */
                let player = games[gameCode].players[i];
                /** @type {Place} */
                let curPlace = games[gameCode].GetPlace(player.position);

                if (curPlace.owner != games[gameCode].turn && curPlace.owner > -1) { //Not owned by self and is owned
                    player.money -= Math.round(curPlace.cost / 3);
                    games[gameCode].players[curPlace.owner].money += Math.round(curPlace.cost / 3);
                    message.reply(`You gave ¤${Math.round(curPlace.cost / 3)} to <@${games[gameCode].players[curPlace.owner].id}>.`);
                    if (player.money < 0) {
                        message.reply("You are now bankrupt.");
                        ff.Lose(message, args, games, player.id);
                    }
                }

                if (curPlace.owner === -3) { //Free Parking
                    player.money += curPlace.cost;
                    message.channel.send("You gained ¤" + curPlace.cost + ". The next person will get ¤" + (curPlace.cost + 1) + ".");
                    curPlace.cost++;
                }
                

                if (num1 === num2) {
                    message.channel.send("You rolled doubles, so you get another roll.");
                    games[gameCode].phase = "Roll/Buy"
                }
                else if (i + 1 === games[gameCode].players.length)  {
                    //games[givenCode].turn = 0;
                    games[gameCode].phase = "Buy"
                }
                else {
                    //games[givenCode].turn++;
                    games[gameCode].phase = "Buy"
                }
            }
        }

        if (!inGame) message.channel.send("You are not in that game.");

        

		(async () => {
            await keyv.set('games', games);
		})();
	},
};