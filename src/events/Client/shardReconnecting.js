const { MessageEmbed } = require('discord.js');

module.exports = (client, id) => {
  
  const Giveaway = client.channels.cache.get(client.config.logs);
  
  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Reconnecting`)
  .setColor('ORANGE')
  .setTimestamp()
  Giveaway.send({embeds: [embed]})
}
