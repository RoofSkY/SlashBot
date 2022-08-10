const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('퐁!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};