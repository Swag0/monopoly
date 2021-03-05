const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
    name: 'order',
    description: 'Shows which turn you have',
    execute(message, args, keyv, games) {
        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let inGame = false;

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === message.author.id) {
                message.channel.send("You are Player " + (i+1) + ".");
                inGame = true;
            }
        }

        if (!inGame) message.channel.send("You are not in that game.");
    },
};
