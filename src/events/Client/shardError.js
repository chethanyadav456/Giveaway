const {MessageEmbed, WebhookClient} = require('discord.js');

module.exports = (client, error, id) => {
  
  const hook = new WebhookClient({ url: client.config.hook.shard});

  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Errored`)
  .setColor('RED')
  .setTimestamp()
  hook.send({embeds: [embed]})
}