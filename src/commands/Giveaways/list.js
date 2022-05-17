const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
module.exports = {
  name: "list",
  aliases: [""],
  category: "Giveaways",
  description: "To see all giveaways in server",
  permission: [],
  owner: false,
  run: async (client, message, args, guildData, lang) => {

    const select = new MessageSelectMenu().setCustomId("select").setPlaceholder(lang.required.holder).addOptions([
      {
        label: lang.required.label,
        description: lang.required.ldis,
        value: 'normal',
    },
      {
        label: lang.required.label2,
        description: lang.required.ldis2,
        value: "guildReq"
    },
  ])
    const row = new MessageActionRow().addComponents([select])
    let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${message.guild.id}` && !g.ended);
    if (!giveaways.some(e => e.messageId)) {
      return message.reply(lang.required.nogway)
    }
    const msg = await message.reply({ embeds: [new MessageEmbed().setDescription(lang.required.msg).setColor("#2F3136").setTimestamp()], components: [row] })
    let embed = new MessageEmbed()
      .setTitle(lang.required.cag)
      .setColor(client.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()
    let embedGuild = new MessageEmbed()
      .setTitle(lang.required.carg)
      .setColor(client.color)
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setTimestamp()

    const filter = x => x.customId == "select" && x.user.id == message.author.id
    const collector = await message.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
    collector.on("collect", async (i) => {
      i.update({ components: [] });
      const val = i.values[0]
      if (val == "normal") {
        await Promise.all(giveaways.map(async (x) => {
          embed.addField(`${lang.required.ng}:`, `**${lang.required.ex.prize}:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})\n${lang.required.ex.stat}:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**${lang.required.ex.end}:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
        }));
        msg.edit({ embeds: [embed] })
      }
      if (val == "guildReq") {
        if (!giveaways.some(e => e.extraData)) return msg.edit({ content: lang.required.nogway, embeds: [] }).catch(e => console.error(e))
        await Promise.all(giveaways.map(async (x) => {
          if (x.extraData) {
            const guild = client.guilds.cache.get(x.extraData.server)
            const channel = guild.channels.cache
              .filter((channel) => channel.type === 'text')
              .first()
            const inv = await channel.createInvite()
            embedGuild.addField(`${lang.required.rg}:`, `**${lang.required.ex.prize}:** **[${x.prize}](https://discord.com/channels/${x.guildID}/${x.channelID}/${x.messageID})**\n**${lang.required.ex.rq}: [${lang.required.ex.ts}](${inv})**\n**${lang.required.ex.stat}** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**${lang.required.ex.end}:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
          }
        }));
        msg.edit({ embeds: [embedGuild] })
      }
    })
    collector.on("end", (collected, reason) => {
      if (reason == "time")
        msg.edit({ content: "👀 Collector Destroyed, Try Again!", components: [] })
    })
  }
}