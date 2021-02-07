const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
const { prefix, token } = require('./config.json');
const Player = require('./player.js');
const Match = require('./games.js');

const Keyv = require('keyv');
const keyv = new Keyv();


let games = [
]

keyv.on('error', err => console.error(chalk.redBright('KEYV ERROR'), err));
/*
(async () => {
    await keyv.set('games', games);
    let x = await keyv.get('games');
    console.log(x[0].players[0].id);
})();*/

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Watching ${client.guilds.cache.size} Servers.`);
    console.error(chalk.greenBright(`Logged in as ${client.user.tag}!`));
    client.user.setActivity("dogecoin. | &help", { type: "WATCHING" }); //Watching stocks crash.
});

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args, keyv, games);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);