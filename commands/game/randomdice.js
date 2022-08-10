const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('주사위')
        .setDescription('주사위 게임을 합니다!')
        .addStringOption(option =>
            option.setName('숫자')
                .setDescription('숫자를 선택해주세요!')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '랜덤', value: 'ran' },
                ))
        .addNumberOption(option =>
            option.setName('판돈')
                .setDescription('판돈를 입력해주세요!')
                .setRequired(true)),

    async execute(interaction) {
        let user = interaction.options.getString('숫자');
        const reqer = interaction.member.nickname;
        const ai = Math.floor(Math.random() * 5) + 1
        const dice = ["", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
        const beting = interaction.options.getNumber('판돈');

        //console.log(beting)
        if (user == "ran") {
            user = Math.floor(Math.random() * 5) + 1
        }

        const embed1 = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle("주사위 굴리는 중...")
            .setDescription("덜그럭...")
            .setFooter(reqer + "ㅣ 선택한 숫자: " + user + " ㅣ 베팅한 돈:  §" + beting, interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed1] });
        await wait(2000);

        let result = "";
        if (user == ai) {
            result = "⭕ 적중 성공! ⭕";
        } else if (user != ai) {
            result = "❌ 적중 실패 ㅠㅠ ❌";
        }

        const embed2 = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle("주사위 결과!")
            .setDescription(dice[ai] + "\n**" + result + "**")
            .setFooter(reqer + "ㅣ 선택한 숫자: " + user + " ㅣ 베팅한 돈:  §" + beting, interaction.user.displayAvatarURL());
        interaction.editReply({ embeds: [embed2] });
    },
};