const Player = require('../player.js');
const Match = require('../games.js');
const Discord = require('discord.js');

module.exports = {
	name: 'board',
	description: 'Shows board',
	execute(message, args, keyv, games) {

        if (args[0] === undefined) return;

        var gameCode = parseInt(args, 10);

        if (games[gameCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }
       
        games[gameCode].ShowBoard(message);
	},
};