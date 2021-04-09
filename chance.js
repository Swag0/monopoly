const Player = require('./player.js');
const Match = require('./games.js');
const Discord = require("discord.js");

const chances = [
    {
        main_text: "Give ¤5 to all the remaining players.",
        sub_text: "I am once again asking for your finincial support."
    },
    {
        main_text: "Gain ¤20 because of economic stimulus cheque.",
        sub_text: "**This is socialism** but it gives me money, so it's good."
    },
    {
        main_text: "Go right to *GO*.",
        sub_text: "GO GO POWER RANGERS."
    },
    {
        main_text: "Go to the nearest owned property that isn't owned by you and pay double rent.",
        sub_text: "You trashed the AirBNB."
    },
    {
        main_text: "Give ¤5 to *Free Parking*",
        sub_text: "Because someone has to pay for it. It's not free for nothing."
    },
    {
        main_text: "You accidentally killed your sibling trying to do karate moves. Go back 5 spaces.",
        sub_text: "Your parents are starting to get annoyed that they keep having to have kids only for you to karate chop them."
    },
    {
        main_text: "Go to your nearest owned property and sell it.",
        sub_text: "Your property? **Our property.**"
    }
]

/**
 * Chance function lol
 * @param {Match[]} games
 * @param {number} playerID
 * @param {Match} match
 */
function Chance(games, playerID, match) {
    //Pick a random chance card from the list of chances.

    let o = getRandomInt(chances.length);
    let card = chances[o];
    console.log("Hit chance space.");

    let done = true;
    let i;

    switch (o) {
        case 0:
            // give other players 5 dollars
            done = false;
            let amount = 0;
            while (!done) {
                i = 0;
                if (match.players[i]) {
                    if (match.players[i].id != "-") {
                        match.players[i].money += 5;
                        amount += 5;
                    }
                } else {
                    done = true;
                }
                i++;
                match.players[match.turn].money -= amount;
            }
            break;
        case 1:
            // give player 20 dollars
            match.players[match.turn].money += 20;
            break;
        case 2:
            // all other players give some amount of moneys to the player
            match.players[match.turn].boardPosition = 0;
            match.players[match.turn].money += 8;
            msg.channel.send("You passed GO.");
            break;
        case 3:
            done = false;
            i = match.players[match.turn].boardPosition;
            while (!done) {
                i++;
                if (i.owner >= 0 && i.owner != match.turn) {
                    player.money -= Math.round(i.cost / 1.5);
                    match.players[i.owner].money += Math.round(i.cost / 1.5);
                    message.reply(`You gave ¤${Math.round(i.cost / 1.5)} to <@${match.players[i.owner].id}>.`);
                    done = true;
                }
            }
            match.players[match.turn].boardPosition = i;
            break;
        case 4:
            match.places[15].cost += 5;
            break;
        case 5:
            match.players[match.turn].boardPosition -= 5;
            if (match.players[match.turn].boardPosition < 0) {
                match.players[match.turn].boardPosition = 40 + match.players[match.turn].boardPosition;
            }
            break;
        case 6:
            done = true;
            let i = match.players[match.turn].boardPosition;
            while (!done) {
                i++;
                if (i.owner === match.turn) {
                    i.owner = 0;
                    message.reply(`You sold space number ${i+1}.`);
                    done = true;
                }
            }
            break;
        default:
            break;
    }
    
    const chanceEmbed = new Discord.MessageEmbed()
    .setColor('#B71C34')
    .setTitle("Chance Card")
    .addField(card.main_text + ": ", card.sub_text + ": ")
    .setFooter(`${msg.author.username}`)
    .setTimestamp()
    msg.channel.send(chestEmbed);

}
module.exports = { Chance };