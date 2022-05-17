const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = (client, rateLimitData) => {
 const hook = new WebhookClient({ url: client.config.hook.error});

 const embed = new MessageEmbed()
 .setDescription(`${rateLimitData}`)
 .setTimestamp()
 .setColor('RED')
 hook.send({ embeds: [embed]})  
}