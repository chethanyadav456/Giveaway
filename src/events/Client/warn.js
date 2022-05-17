const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = (client, error) => {
const hook = new WebhookClient({ url: client.config.hook.error});

 const embed = new MessageEmbed()
 .setDescription(`${error}`)
 .setTimestamp()
 .setColor('RED')
 hook.send({ embeds: [embed]})  
}