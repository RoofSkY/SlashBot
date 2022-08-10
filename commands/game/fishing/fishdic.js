const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const fishdir = "data/fish.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('어류도감')
        .setDescription('어류도감을 보여줍니다'),
    async execute(interaction) {
        let fishdata = JSON.parse(fs.readFileSync(fishdir));
        const fishlen = fishdata["fish"].length;
        let fishdic = "";

        for (let i = 0; i < fishlen; i++) {
            fishdic += `\`\`\`${fishdata["fish"][i]["name"]}\n${fishdata["fish"][i]["des"]}\n가격: §${fishdata["fish"][i]["cost"]}\n확률: ${fishdata["fish"][i]["per"]}%\`\`\`\n`
        }

        const embed = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle(`어류 도감`)
            .setDescription(`${fishdic}`)
            .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    },
};