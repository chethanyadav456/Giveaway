const { MessageEmbed } = require('discord.js');

module.exports = (client, rateLimitData) => {

 const Giveaway = client.channels.cache.get(client.config.logs);

 const embed = new MessageEmbed()
 .setDescription(`${rateLimitData}`)
 .setTimestamp()
 .setColor('RED')
 Giveaway.send({ embeds: [embed]})  
}
