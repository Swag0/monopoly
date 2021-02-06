module.exports = {
	name: 'games',
	description: 'Shows All Current Games',
	execute(message, args, keyv) {
		(async () => {
            (async () => {
                for (let i = 1; i <= 10; i++) {
                    if (await keyv.get(`game${i}`) != undefined) {
                        message.channel.send(`Game ${i}: Code ` + await keyv.get(`game${i}`));
                    } else {
                        if (await keyv.get(`game1`) == undefined) {
                            message.channel.send(`No Games Right Now.`);
                        }
                        break;
                    }
                }
            })();
            
		})();
	},
};