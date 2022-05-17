const { MessageEmbed } = require('discord.js');

module.exports = (client, info) => {
  const Giveaway = client.channels.cache.get(client.config.logs);

  const embed = new MessageEmbed()
 .setDescription(`${info}`)
 .setTimestamp()
 .setColor('RED')
 Giveaway.send({ embeds: [embed]})
}
