const Player = require('./player.js');
const Match = require('./games.js');
const Discord = require("discord.js");

const chests = [
    {
        main_text: "congrats dumb asss your birthday is nigh; Get ¤5",
        sub_text: "HAPPY BIRTHDAY noob"
    },
    {
        main_text: "Your dogecoin investment paid off; Get ¤20",
        sub_text: "DOGECOIN to the moon xDDDD"
    },
    {
        main_text: "Everyone pays ¤5 to you",
        sub_text: "It's tax. But you are the government. Time to drone strike Pakistan!"
    },
    {
        main_text: "Go to the *Free Parking* space",
        sub_text: "Your tesla drove you there by mistake."
    }
]

/**
 * Return a random int from 0 to max (exclusive)
 * @param {number} max
 * @returns {number} A random integer between 0 and max (exclusive)
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Chance function lol
 * @param {number} playerid
 * @param {Match} match
 */
function Chest(playerid, match, msg) {
    //Pick a random chest card from the list of chests.
    let o = getRandomInt(chests.length);
    let card = chests[o];
    console.log("Hit chest space.");

    let done = false;

    switch (o) {
        case 0:
            // give player 5 dollars
            match.players[match.turn].money += 5;
            break;
        case 1:
            // give player 20 dollars
            match.players[match.turn].money += 20;
            break;
        case 2:
            // all other players give some amount of moneys to the player
            done = false;
            while (!done) {
                let i = 0;
                if (match.players[i]) {
                    match.players[i].money -= 5;
                } else {
                    done = true;
                }
                i++;
                match.players[match.turn].money += 5;
            }
            break;
        case 3:
            if (match.players[match.turn].boardPosition > 15) {
                match.players[match.turn].money += 8;
                    message.channel.send("You passed GO.");
            }
            
            match.players[match.turn].boardPosition = 15;
            break;
        default:
            break;
    }
    
    const chestEmbed = new Discord.MessageEmbed()
    .setColor('#B71C34')
    .setTitle("Community Chest Card")
    .addField(card.main_text + ": ", card.sub_text + ": ")
    .setFooter(`${msg.author.username}`)
    .setTimestamp()
    msg.channel.send(chestEmbed);
}
module.exports = { Chest };

// chest cards:
// Community Chest Cards:
// congrats dumb asss your birthday is nigh; get moeny {HAPPY BIRTHDAY noob}
// your dogecoin investment oauid ieeof; get monee { DOGECOIN to the moon xDDDD }
// Everyone pays money to u {tax but you are the government, time to drone strike pakistan! }
// Go to the free parking space { your tesla drove you there by mistake }
    /*
    const chanceEmbed = new Discord.MessageEmbed()
            .setColor('#B71C34')
            .setTitle("Chance Card")
            .addField("Go right to Go: ", "GO GO POWER RANGERS")
            .setFooter("Player 1")
            .setTimestamp()
    msg.channel.send(chanceEmbed);
    */