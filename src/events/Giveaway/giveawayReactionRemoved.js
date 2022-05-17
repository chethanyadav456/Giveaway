const { WebhookClient, MessageEmbed } = require("discord.js");
const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/912043515943460884/e0D9KQEMRCs0FM-ZHdopu1MyzyXaPngr5tsyXOfnQydTAP2tNEohslKXmLdRDWYa_78T'});
module.exports = {
  async execute(giveaway, member) {
    return hook.send({
      embeds: [new MessageEmbed()
        .setTimestamp()
        .setTitle('Remove a Reaction From  Giveaway?')
        .setColor("#2F3136")
        .setDescription(
          `${member} Reaction Remove from [${giveaway.prize}](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) `)
      ]
    }).catch(e => {})

  }
}