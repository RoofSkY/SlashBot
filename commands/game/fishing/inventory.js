const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const userdir = "data/userdata.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('인벤토리')
        .setDescription('인벤토리를 봅니다!'),
    async execute(interaction) {
        let userdata = JSON.parse(fs.readFileSync(userdir));

        const user_id = interaction.user.id;
        if (userdata[user_id] == undefined) return await interaction.reply("`/가입`을 입력해 가입먼저 해주세요 ㅠㅠ");

        const invenlen = userdata[user_id]["inventory"].length;
        let inven = "";
        for (let i = 0; i < invenlen; i++) {
            inven += `\`${userdata[user_id]["inventory"][i]}\`\n`
        }

        if (inven == "") {
            inven = "아직 인벤토리에 아이템이 없어요 ㅠㅠ";
        }

        const embed = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle(`${interaction.member.nickname}님의 인벤토리`)
            .setDescription(`${inven}`)
            .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] });
    },
};