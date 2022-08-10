const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('룰렛')
        .setDescription('룰렛을 돌립니다!')
        .addNumberOption(option =>
            option.setName('판돈')
                .setDescription('판돈를 입력해주세요!')
                .setRequired(true)),

    async execute(interaction) {
        const fir = [":apple:", ":grapes:", ":tangerine:"];
        const sec = [":apple:", ":grapes:", ":tangerine:"];
        const thr = [":apple:", ":grapes:", ":tangerine:"];
        let rst1 = fir[Math.floor(Math.random() * fir.length)]
        let rst2 = sec[Math.floor(Math.random() * sec.length)]
        let rst3 = thr[Math.floor(Math.random() * thr.length)]
        const reqer = interaction.member.nickname;
        const beting = interaction.options.getNumber('판돈');

        const embed1 = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle("룰렛돌리는중...")
            .setDescription("드르르륵...")
            .setFooter(reqer + "ㅣ 베팅한 돈:  §" + beting, interaction.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed1] });
        await wait(2000);

        let a = "";
        if ((rst1 === rst2) && (rst2 === rst3)) {
            a = "🎉 축하드립니다! 잭팟입니다! 🎉";
        } else {
            a = "❌ 아쉽네요! 다음 기회에! ❌";
        }

        const embed2 = new MessageEmbed()
            .setColor("#00ddff")
            .setTitle("룰렛 결과!")
            .setDescription(rst1 + rst2 + rst3 + " \n**" + a + "**")
            .setFooter(reqer + "ㅣ 베팅한 돈:  §" + beting, interaction.user.displayAvatarURL());
        interaction.editReply({ embeds: [embed2] });
    },
};