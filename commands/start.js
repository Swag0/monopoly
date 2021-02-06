module.exports = {
	name: 'start',
	description: 'Start Game',
	execute(message, args, keyv) {
		let gameCode = Math.round(Math.random()*100);

		(async () => {
			for (let i = 1; i <= 10; i++) {
				if (await keyv.get(`game${i}`) == undefined) {
					await keyv.set(`game${i}`, gameCode, 1800000);
					message.channel.send("Starting New Game. Code: " + gameCode + ".");
					return;
				}
			}
			message.channel.send("Too Many Games");
		})();
	},
};