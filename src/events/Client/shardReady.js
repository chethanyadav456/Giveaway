const { MessageEmbed } = require('discord.js');

module.exports = (client, event, id) => {
  
  const Giveaway = client.channels.cache.get(client.config.logs);
  
  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Ready`)
  .setColor('GREEN')
  .setTimestamp()
  Giveaway.send({embeds: [embed]})
}
