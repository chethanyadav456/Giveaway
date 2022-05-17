const { MessageEmbed } = require('discord.js');

module.exports = (client, error) => {

   const Giveaway = client.channels.cache.get(client.config.logs);

 const embed = new MessageEmbed()
 .setDescription(`${error}`)
 .setTimestamp()
 .setColor('RED')
 Giveaway.send({ embeds: [embed]})  
}
