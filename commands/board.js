const Player = require('../player.js');
const Match = require('../games.js');
const Discord = require('discord.js')

module.exports = {
	name: 'board',
	description: 'Shows board',
	execute(message, args, keyv, games) {

        var gameCode = parseInt(args, 10);

        if (games[gameCode] == undefined) {
            message.channel.send("That game room does not exist right now.");
            return;
        }
        //22 Squares
        /*
        Square 0 = GO
        */

        //:red_circle: :blue_circle: :blue_circle: :yellow_circle: :orange_circle: :purple_circle: 

        let RED = '🔴'; //main / p1
        let BLUE = '🔵'; //p2
        let GREEN = '🟢'; //p3
        let YELLOW = '🟡'; //p4
        let ORANGE = '🟠'; //p5
        let PURPLE = '🟣'; //p6
        let MULTIPLE = '⏺️';

        let color;

        let spots = [];

        for (let i = 0; i < 50; i++) { //Spot
            if (i === 0) spots[i] = '❎';
            else spots[i] = '⬜';
            for (let j = 0; j < games[gameCode].players.length; j++) { //Player

                //console.log("Spot: " + i + ". " + games[gameCode].players[j].position);

                if (games[gameCode].players[j].position === i) {
                    switch(j) {
                        case 0:
                          color = RED;
                          break;
                        case 1:
                          color = BLUE;
                          break;
                        case 2:
                          color = GREEN;
                          break;
                        case 3:
                          color = YELLOW;
                          break;
                        case 4:
                          color = ORANGE;
                          break;
                        case 5:
                          color = PURPLE;
                          break;
                      }
                    
                    if (spots[i] != '⬜' && spots[i] != '❎') spots[i] = MULTIPLE;
                    else spots[i] = color;
                }
                //console.log(spots[i] + "; Player " + j + " at position " + i + ".");
            }
        }

        let text1 = "";
        for (let i = 0; i <= 15; i++) {
            text1 += spots[i];
        }

        //16, 17, 18, 19

        let text2 = "";
        for (let i = 35; i >= 20; i--) {
            text2 += spots[i];
        }

        //36, 37, 38, 39

        let spacing = "                                                                                    ";

        //console.log(text);
        //message.channel.send(text);

        const board = new Discord.MessageEmbed()
        .setTitle(`Monopoly`)
        .setDescription(`Player 1: ${RED}, Player 2: ${BLUE}`)
        .addField(`${text1}`, `\u200b`)
        .addField(`${spots[39]}${spacing}${spots[16]}`, `\u200b`)
        .addField(`${spots[38]}${spacing}${spots[17]}`, `\u200b`)
        .addField(`${spots[37]}${spacing}${spots[18]}`, `\u200b`)
        .addField(`${spots[36]}${spacing}${spots[19]}`, `\u200b`)
        .addField(`${text2}`, `\u200b`)
        .setFooter(`ID: ${gameCode}, Turn: Player ${games[gameCode].turn + 1}`)
        message.channel.send(board);
	},
};