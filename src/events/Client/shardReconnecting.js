const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = (client, id) => {
  const hook = new WebhookClient({ url: client.config.hook.shard});
  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Reconnecting`)
  .setColor('ORANGE')
  .setTimestamp()
  hook.send({embeds: [embed]})
}
