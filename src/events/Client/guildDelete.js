const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, guild) => {
  
  const Giveaway = client.channels.cache.get(client.config.logs);

  
  const embed = new MessageEmbed()
    .setThumbnail(guild.iconURL({ dynamic: true, size: 1024}))
    .setTitle(`📤 Left a Guild !!`)
    .addField('Name', `\`${guild.name}\``)
    .addField('ID', `\`${guild.id}\``)
    .addField('Member Count', `\`${guild.memberCount}\` Members`)
    .addField('Creation Date', `\`${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\``)
    .addField(`${client.user.username}'s Server Count`, `\`${client.guilds.cache.size}\` Severs`)
    .setColor(client.color)
    .setTimestamp()
    Giveaway.send({embeds: [embed]})
}
