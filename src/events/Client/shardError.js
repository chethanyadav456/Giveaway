const { MessageEmbed } = require('discord.js');

module.exports = (client, error, id) => {
  
  const Giveaway = client.channels.cache.get(client.config.logs);

  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Errored`)
  .setColor('RED')
  .setTimestamp()
  Giveaway.send({embeds: [embed]})
}
