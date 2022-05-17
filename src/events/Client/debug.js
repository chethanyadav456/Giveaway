const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = (client, info) => {
  const hook = new WebhookClient({ url: client.config.hook.error});

  const embed = new MessageEmbed()
 .setDescription(`${info}`)
 .setTimestamp()
 .setColor('RED')
 hook.send({ embeds: [embed]})
}
