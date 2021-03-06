const Player = require('../player.js');
const Match = require('../games.js');

module.exports = {
    name: 'end',
    description: 'Ends your turn',
    execute(message, args, keyv, games) {

        this.EndTurn(message, args, games, false);

        (async () => {
            await keyv.set('games', games);
        })();
    },

    EndTurn(message, args, games, ff) {
        var givenCode = parseInt(args, 10);

        if (games[givenCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }

        let inGame = false;

        for (let i = 0; i < games[givenCode].players.length; i++) {
            if (games[givenCode].players[i].id === message.author.id) {
                if (i != games[givenCode].turn) {
                    message.reply("It is not your turn.");
                    return;
                }

                if (games[givenCode].phase != "Buy") {
                    message.reply("It is not buying phase. It is " + games[givenCode].phase.toLowerCase() + "ing phase.");
                    return;
                }

                for (let skipped = 1; i < games[givenCode].players.length; skipped++) {
                    if (i + skipped === games[givenCode].players.length) { //if goes to 0
                        
                        if (games[givenCode].players[0].id != "-") {
                            games[givenCode].turn = 0;
                            games[givenCode].phase = "Roll";
                            break;
                        }
                    } else {
                        var effectiveTurn = games[givenCode].turn;
                        let newTurn = effectiveTurn + skipped;
                        if (games[givenCode].players[newTurn].id != "-") {
                            games[givenCode].turn += skipped;
                            games[givenCode].phase = "Roll";
                            break;
                        }
                    }
                }

                if (ff) message.channel.send(`You have given up. It is <@${games[givenCode].players[games[givenCode].turn].id}>'s turn now.`);
                else message.channel.send(`Turn ended. It is <@${games[givenCode].players[games[givenCode].turn].id}>'s turn now.`);


                inGame = true;

            }
        }

        if (!inGame && !ff) message.channel.send("You are not in that game.");

        games[givenCode].ShowBoard(message);
    }
};
