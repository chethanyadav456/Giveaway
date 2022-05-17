const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = (client, event, id) => {
const hook = new WebhookClient({ url: client.config.hook.shard});
  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Ready`)
  .setColor('GREEN')
  .setTimestamp()
  hook.send({embeds: [embed]})
}