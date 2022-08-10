const { Discord, Client, Collection, MessageEmbed, Intents } = require('discord.js');
const { token } = require('./config.json');
const Sequelize = require('sequelize');
const fs = require('node:fs');
const path = require('node:path');

const wait = require('node:timers/promises').setTimeout;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

let commandsPath = path.join(__dirname, 'commands');
let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

commandsPath = path.join(__dirname, 'commands/game');
commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

commandsPath = path.join(__dirname, 'commands/game/fishing');
commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    client.user.setActivity('!mhelp')
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        //await interaction.reply({ content: '명령어를 불러오는 도중에 에러가 발생했어요 ㅠㅠ', ephemeral: true });
    }
});

client.login(token);

