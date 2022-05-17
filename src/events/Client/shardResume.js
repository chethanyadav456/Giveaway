const { MessageEmbed } = require('discord.js');

module.exports = (client, replayedEvents, id) => {

   const Giveaway = client.channels.cache.get(client.config.logs);

  const embed = new MessageEmbed()
  .setDescription(`Shard #${id} Resumed`)
  .setColor('GREEN')
  .setTimestamp()
  Giveaway.send({embeds: [embed]})
}
