const Player = require('../player.js');
const Match = require('../games.js');
const Discord = require("discord.js");

module.exports = {
	name: 'invite',
	description: 'Sends invite code.',
	execute(message, args, keyv, games) {

		const inviteEmbed = new Discord.MessageEmbed()
        .setColor('#1fa8e4')
        .setDescription("To add me to your server, please click [this](https://discord.com/oauth2/authorize?client_id=804865133662830663&scope=bot&permissions=68608).")
      	message.channel.send(inviteEmbed);
    }
};