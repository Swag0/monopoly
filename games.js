const Place = require('./place.js');
const Discord = require('discord.js');
const Player = require('./player.js');

var REDP = '🔴'; //main / p1
var BLUEP = '🔵'; //p2
var GREENP = '🟢'; //p3
var YELLOWP = '🟡'; //p4
var ORANGEP = '🟠'; //p5
var PURPLEP = '🟣'; //p6
var MULTIPLE = '⏺️';

var DEAD = '❌';

var RED = '🟥'; //main / p1
var BLUE = '🟦'; //p2
var GREEN = '🟩'; //p3
var YELLOW = '🟨'; //p4
var ORANGE = '🟧'; //p5
var PURPLE = '🟪'; //p6

class Match {
    /** @type {number} */
    matchID;
    /** @type {Player[]} */
    players;
    /** @type {number} */
    turn;
    /** @type {string} */
    phase; //Rolling phase and buying phase
    /** @type {Place[]} */
    places;

    constructor(matchID = 0, players = [], turn = 0, phase = "Roll") {
        this.matchID = matchID;
        this.players = players;
        this.turn = turn;
        this.phase = phase;
        this.places = [];
        this.CreateBoard();
    }

    IsPlayerInGame(id) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].id === id) {
                return true;
            }
        }
        return false;
    }

    /**
     * Returns the place from the given position.
     * @param {number} position 
     * @returns {Place}
     */
    GetPlace(position) {
        return this.places[position];
    }

    CreateBoard() {
        /*
        Random Pick 2 
        16, 17, 18, 19
        36, 37, 38, 39
        */
        let chest1 = Math.floor((Math.random()*4)+16);
        let chest2 = Math.floor((Math.random()*4)+36);
        let chance1 = Math.floor((Math.random()*4)+16);
        let chance2 = Math.floor((Math.random()*4)+36);

        while (chest1 === chance1) {
            chest1 = Math.floor((Math.random()*4)+16);
        }

        while (chest2 === chance2) {
            chest2 = Math.floor((Math.random()*4)+36);
        }
        for (let i = 0; i < 40; i++) {
            switch (i) {
                case 0: //GO
                    this.places[i] = new Place(i, 0, -2);
                    break;
                case 15: //Free Parking
                    this.places[i] = new Place(i, 0, -3);
                    break;
                case chest1:
                    this.places[i] = new Place(i, 0, -4);
                    break;
                case chest2:
                    this.places[i] = new Place(i, 0, -4);
                    break;
                case chance1:
                    this.places[i] = new Place(i, 0, -5);
                    break;
                case chance2:
                    this.places[i] = new Place(i, 0, -5);
                    break;
                default: //Normal Space
                    this.places[i] = new Place(i, Math.round((1 / 145.46) * Math.pow(i + 1, 2) + 4), -1);
                    break;
            }
        }
        //console.log(this.places);
    }

    /**
     * @param {number} i
     */
    GenerateSpots(i) {

        let text = "";

        let peopleOn = 0;
        for (let j = 0; j < this.players.length; j++) {
            if (this.players[j].boardPosition === i) {
                peopleOn++;
            }
        }
        if (peopleOn > 1) {
            text += MULTIPLE;
        } else if (peopleOn === 1) {
            for (let j = 0; j < this.players.length; j++) {
                if (this.players[j].boardPosition === i) {
                    switch (j) {
                        case 0:
                            text += REDP;
                            break;
                        case 1:
                            text += BLUEP;
                            break;
                        case 2:
                            text += GREENP;
                            break;
                        case 3:
                            text += YELLOWP;
                            break;
                        case 4:
                            text += ORANGEP;
                            break;
                        case 5:
                            text += PURPLEP;
                            break;
                    }
                }
            }
        } else {
            if (this.places[i].owner >= 0) {
                switch (this.places[i].owner) {
                    case 0:
                        text += RED;
                        break;
                    case 1:
                        text += BLUE;
                        break;
                    case 2:
                        text += GREEN;
                        break;
                    case 3:
                        text += YELLOW;
                        break;
                    case 4:
                        text += ORANGE;
                        break;
                    case 5:
                        text += PURPLE;
                        break;
                }
            } else if (this.places[i].owner == -2) { //Special spot
                text += '❎';
            } else if (this.places[i].owner == -3) { //Free Parking
                text += ':free:'
            } else if (this.places[i].owner == -4) { //Community Chest
                text += '💰'
            } else if (this.places[i].owner == -5) { //Chance
                text += '❓'
            } else {
                if (this.places[i].owner != -1) console.log("Someone else owns this.")
                text += '⬜';
            }
        }
        return text;
    }

    ShowBoard(msg) {
        // Top row.
        let text1 = "";
        for (let i = 0; i <= 15; i++) {
            text1 += this.GenerateSpots(i);
        }

        //16, 17, 18, 19

        let text2 = "";
        for (let i = 35; i >= 20; i--) {
            text2 += this.GenerateSpots(i);
        }
        //36, 37, 38, 39

        let spacing = "                                                                                    ";

        //console.log(text);
        //message.channel.send(text);

        if (this.players[0].id === "-") {
            REDP = DEAD;
        }
        if (this.players[1].id === "-") {
            BLUEP = DEAD;
        }


        let players = "";

        if (this.players[5]) { //6
            if (this.players[5].id === "-") {
                PURPLEP = DEAD;
            }
            if (this.players[4].id === "-") {
                ORANGEP = DEAD;
            }
            if (this.players[3].id === "-") {
                YELLOWP = DEAD;
            }
            if (this.players[2].id === "-") {
                GREENP = DEAD;
            }
            players = `Player 1: ${REDP}, Player 2: ${BLUEP}, Player 3: ${GREENP}, Player 4: ${YELLOWP}, Player 5: ${ORANGEP}, Player 6: ${PURPLEP}`
        } else if (this.players[4]) {//5
            if (this.players[4].id === "-") {
                ORANGEP = DEAD;
            }
            if (this.players[3].id === "-") {
                YELLOWP = DEAD;
            }
            if (this.players[2].id === "-") {
                GREENP = DEAD;
            }
            players = `Player 1: ${REDP}, Player 2: ${BLUEP}, Player 3: ${GREENP}, Player 4: ${YELLOWP}, Player 5: ${ORANGEP}`
        } else if (this.players[3]) {//4
            if (this.players[3].id === "-") {
                YELLOWP = DEAD;
            }
            if (this.players[2].id === "-") {
                GREENP = DEAD;
            }
            players = `Player 1: ${REDP}, Player 2: ${BLUEP}, Player 3: ${GREENP}, Player 4: ${YELLOWP}`
        } else if (this.players[2]) {//3
            if (this.players[2].id === "-") {
                GREENP = DEAD;
            }
            players = `Player 1: ${REDP}, Player 2: ${BLUEP}, Player 3: ${GREENP}`
        } else if (this.players[1]) {//2
            players = `Player 1: ${REDP}, Player 2: ${BLUEP}`
        }

        const board = new Discord.MessageEmbed()
            .setTitle(`Monopoly`)
            .setDescription(players)
            .addField(`${text1}`, `\u200b`)
            .addField(`${this.GenerateSpots(39)}${spacing}${this.GenerateSpots(16)}`, `\u200b`)
            .addField(`${this.GenerateSpots(38)}${spacing}${this.GenerateSpots(17)}`, `\u200b`)
            .addField(`${this.GenerateSpots(37)}${spacing}${this.GenerateSpots(18)}`, `\u200b`)
            .addField(`${this.GenerateSpots(36)}${spacing}${this.GenerateSpots(19)}`, `\u200b`)
            .addField(`${text2}`, `\u200b`)
            .setFooter(`ID: ${this.matchID}, Turn: Player ${this.turn + 1}`)
        msg.channel.send(board);
    }
}

module.exports = Match;