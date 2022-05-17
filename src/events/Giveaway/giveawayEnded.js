
const { MessageEmbed } = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new MessageEmbed()
          .setTitle(`🎁 Congratulations!`)
          .setColor("#33ff33")
          .setDescription(`Hello there ${member.user}\n I heard that you have won **[${giveaway.prize}](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n Good Job On Winning \nContact the host to claim your prize!\n Thanks for using Giveaway `)
          .setTimestamp()
          .setFooter(member.user.username, member.user.displayAvatarURL())
        ]
      }).catch(e => {})
    });

  }
}