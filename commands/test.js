module.exports = {
	name: 'test',
	description: 'Start Game',
	execute(message, args, keyv) {
		(async () => {
            await keyv.set('test', "arr");
            console.log(await keyv.get('test'));
            message.channel.send("ree");
		})();
	},
};