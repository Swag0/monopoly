const Player = require('../player.js');
const Match = require('../games.js');
const Discord = require('discord.js');

module.exports = {
    name: 'buy',
    description: 'Buys a thing',
    execute(message, args, keyv, games) {

        var gameCode = parseInt(args, 10);

        if (games[gameCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let inGame = false;
        for (let i = 0; i < games[gameCode].players.length; i++) {
            if (games[gameCode].players[i].id === message.author.id) {
                if (i != games[gameCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                if (games[gameCode].phase != "Buy") {
                    message.reply("It is not buying phase anymore. It is " + games[gameCode].phase.toLowerCase() + "ing phase.");
                    return;
                }

                inGame = true;
                // Check for buyable spot.
                if (games[gameCode].places[games[gameCode].players[i].position].owner === -1) {
                    games[gameCode].places[games[gameCode].players[i].position].owner = i;
                    if (games[gameCode].players[i].money < games[gameCode].places[games[gameCode].players[i].position].cost) {
                        message.reply(`You can't buy that space. You need ¤${games[gameCode].places[games[gameCode].players[i].position].cost}.`);
                        break;
                    }
                    games[gameCode].players[i].money -= games[gameCode].places[games[gameCode].players[i].position].cost;
                    message.reply(`You spent ¤${games[gameCode].places[games[gameCode].players[i].position].cost} to buy the space you are on.`);
                } else if (games[gameCode].places[games[gameCode].players[i].position].owner === -2) {
                    message.reply("You can't buy that space.");
                    break;
                } else {
                    message.reply(`<@${games[gameCode].players[games[gameCode].places[games[gameCode].players[i].position].owner].id}> owns that space.`);
                    break;
                }
            }

            

        }

        (async () => {
            if (!inGame) message.channel.send("You are not in that game.");
            await keyv.set('games', games);
        })();
    },
};