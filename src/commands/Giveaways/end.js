const { oops, good } = require("../../handler/GuildData")

module.exports = {
    name: "end",
    aliases: [""],
    category: "Giveaways",
    description: "To end giveaway",
    permission: [],
    owner: false,
 run: async (client, message, args, guildData, lang) => {

  if (guildData.plugins.role.enabled) {
	  
  if (!message.member.permissions.has("MANAGE_GUILD") && !message.member.roles.cache.get(guildData.plugins.role.role))
			return message.channel.send(lang.create.perms).then(msg => { setTimeout(() => {msg.delete()}, 5000);
       })
	}
 	if (!args[0]) return message.channel.send(lang.end.msg);

  let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageId == args[0]);
  
	if (!giveaway) return message.channel.send(lang.end.err + "** **" + "`" + args.join(" ") + "`" + ".");
	
	client.giveawaysManager.end(giveaway.messageId)
		.then(() => {
			message.channel.send(lang.end.good + "** **" + "`" + (client.giveawaysManager.options.updateCountdownEvery / 1000) + "`" + "** **" + lang.units.seconds + ".");
		}).catch((e) => {
			if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)) {
				message.channel.send(lang.end.err + "** **" + "`" + giveaway.messageID + "`" + ".");
			} else {
				console.error(e);
				message.channel.send(lang.end.errmod);
			}
		});
   }
 }