const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
	name: 'invite',
	description: 'Sends invite code.',
	execute(message, args, keyv, games) {

        message.channel.send("https://discord.com/oauth2/authorize?client_id=804865133662830663&scope=bot");
    }
};