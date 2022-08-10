const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildIds, token } = require('./config.json');

const commands = [];

let commandsPath = path.join(__dirname, 'commands');
let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

commandsPath = path.join(__dirname, 'commands/game');
commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

commandsPath = path.join(__dirname, 'commands/game/fishing');
commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    guildIds.map(async (guildId) => {
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId)
                , { body: commands }
            );

            console.log(`Success registered slash commands: ${guildId}`);
        } catch (error) {
            console.error(`Failed to register slash commands: ${error}`);
        }
    });

    /*try {
        await rest.put(Routes.applicationCommands(clientId),
            { body: commands }
        );
        console.log(`Success registered slash commands: Global`);
    } catch (error) {
        console.error(`Failed to register slash commands: ${error}`);
    }*/
})();