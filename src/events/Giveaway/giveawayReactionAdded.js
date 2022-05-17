const { WebhookClient, MessageEmbed } = require("discord.js");
const hook = new WebhookClient({ url: 'https://discord.com/api/webhooks/912043515943460884/e0D9KQEMRCs0FM-ZHdopu1MyzyXaPngr5tsyXOfnQydTAP2tNEohslKXmLdRDWYa_78T'});
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved = new MessageEmbed()
      .setTimestamp()
      .setColor("#33ff33")
      .setTitle("Giveaway Entey Approved!")
      .setDescription(
        `<@${reactor.id}> entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been approved!`
      )
      .setTimestamp()
    let denied = new MessageEmbed()
      .setTimestamp()
      .setColor("#2F3136")
      .setTitle(":x: Giveaway Entey Denied!")
      .setDescription(
        `<@${reactor.id}> entry to [${giveaway.prize}](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been denied.`
      )

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if (giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try {
          await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
          return hook.send({
            embeds: [approved]
          });
        } catch (e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)) {
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => {})
      }

      return hook.send({
        embeds: [approved]
      }).catch(e => {})
    } else {
      return hook.send({
        embeds: [approved]
      }).catch(e => {})
    }
  }
}