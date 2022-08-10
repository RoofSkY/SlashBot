const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const userdir = "data/userdata.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가입')
        .setDescription('게임에 가입합니다!'),
    async execute(interaction) {
        let userdata = JSON.parse(fs.readFileSync(userdir));

        if (userdata[interaction.user.id] == undefined) {
            userdata[interaction.user.id] = {};
            userdata[interaction.user.id]["currency"] = 1000;
            userdata[interaction.user.id]["level"] = 0;
            userdata[interaction.user.id]["rank"] = [];
            userdata[interaction.user.id]["inventory"] = [];

            fs.writeFileSync(userdir, JSON.stringify(userdata));

            const embed = new MessageEmbed()
                .setColor("#00ddff")
                .setTitle("게임 가입 완료!")
                .setDescription(`게임 가입이 완료되었습니다!`)
                .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
            await interaction.reply({ embeds: [embed] });

        } else {
            const embed = new MessageEmbed()
                .setColor("#b71c1c")
                .setTitle("게임 가입 실패!")
                .setDescription(`이미 가입된 유저입니다!`)
                .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
            await interaction.reply({ embeds: [embed] });
        }
    },
};