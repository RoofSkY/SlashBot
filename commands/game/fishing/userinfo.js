const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const userdir = "data/userdata.json";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('정보')
        .setDescription('게임에서 자신이나 다른유저의 정보를 봅니다!')
        .addUserOption(option =>
            option.setName('유저')
                .setDescription('정보를 보고싶은 유저를 선택해주세요!')
                .setRequired(false)),
    async execute(interaction) {
        let userdata = JSON.parse(fs.readFileSync(userdir));

        if (interaction.options.getUser('유저') == null) {
            const user_id = interaction.user.id;

            if (userdata[user_id] == undefined) return await interaction.reply("`/가입`을 입력해 가입먼저 해주세요 ㅠㅠ");

            const level = userdata[user_id]["level"];
            const currency = userdata[user_id]["currency"];

            const ranklen = userdata[user_id]["rank"].length;
            let rank = "";
            for (let i = 0; i < ranklen; i++) {
                rank += `\`${userdata[user_id]["rank"][i]}\`\n`
            }

            if (rank == "") {
                rank = "아직 달성한 업적이 없어요 ㅠㅠ";
            }

            const embed = new MessageEmbed()
                .setColor("#00ddff")
                .setTitle(`${interaction.member.nickname}님의 정보`)
                .setDescription(`Lv.\`${level}\`\n지갑잔액: \`§${currency}\`\n\n업적\n${rank}`)
                .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
            await interaction.reply({ embeds: [embed] });
        } else {
            const user_id = interaction.options._hoistedOptions[0].value;

            if (userdata[user_id] == undefined) return await interaction.reply("`/가입`을 입력해 가입먼저 해주세요 ㅠㅠ");

            const level = userdata[user_id]["level"];
            const currency = userdata[user_id]["currency"];

            const ranklen = userdata[user_id]["rank"].length;
            let rank = "";
            for (let i = 0; i < ranklen; i++) {
                rank += `\`${userdata[user_id]["rank"][i]}\`\n`
            }

            if (rank == "") {
                rank = "아직 달성한 업적이 없어요 ㅠㅠ";
            }

            const embed = new MessageEmbed()
                .setColor("#00ddff")
                .setTitle(`${interaction.member.nickname}님의 정보`)
                .setDescription(`Lv.\`${level}\`\n지갑잔액: \`§${currency}\`\n\n업적\n${rank}`)
                .setFooter(interaction.member.nickname, interaction.user.displayAvatarURL());
            await interaction.reply({ embeds: [embed] });
        }
    },
};