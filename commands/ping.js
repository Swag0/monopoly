module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, keyv) {
        message.channel.send('Pong.');
	},
};