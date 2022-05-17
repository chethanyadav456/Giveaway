const ms = require("ms");
module.exports = {
    name: "start",
	  aliases: ["s"],
    category: "Giveaways",
    description: "To start giveaway",
    permission: [],
    owner: false,
 run: async (client, message, args, guildData, lang) => {

   	if (guildData.plugins.role.enabled) {
	
		if (!message.member.permissions.has("MANAGE_GUILD") && !message.member.roles.cache.get(guildData.plugins.role.role))
			return message.channel.send(lang.create.perms).then(msg => { setTimeout(() => {msg.delete()}, 5000);
       })
	}

	// Giveaway duration
	const giveawayDuration = args[0];
	// If the duration isn't valid
	if (!giveawayDuration || isNaN(ms(giveawayDuration)) || ms(giveawayDuration) < ms("1m")) {
		return message.channel.send(lang.start.duration)
			.then(msg => { setTimeout(() => {msg.delete()}, 5000);
       })
	}
	
	const giveawayNumberWinners = args[1];
	// If the specified number of winners is not a number
	if (isNaN(giveawayNumberWinners)) {
		return message.channel.send(lang.start.argswinners)
			.then(msg => { setTimeout(() => {msg.delete()}, 5000);
       })
	}

	const giveawayPrize = args.slice(2).join(" ");
	// If no prize is specified
	if (!giveawayPrize) {
		return message.channel.send(lang.start.prize)
			.then(msg => { setTimeout(() => {msg.delete()}, 5000);
       })
	}

	if (guildData.plugins.mention.enabled) {
		var text1 = "@everyone\n\n" + lang.create.giveaway;
		var text2 = "@everyone\n\n" + lang.create.giveawayEnded;
	}

	if (!guildData.plugins.mention.enabled) {
		var text1 = lang.create.giveaway;
		var text2 = lang.create.giveawayEnded;
	}

	const MessageChannel = message.channel;

	await client.giveawaysManager.start(MessageChannel, {
		duration: ms(giveawayDuration),
		prize: giveawayPrize,
		winnerCount: parseInt(giveawayNumberWinners),
		hostedBy: client.config.giveaway.hostedBy ? message.author : null,
		lastChance: {
			enabled: client.config.giveaway.lastchanceenabled,
			content: lang.lastchance.content,
			threshold: 5000,
			embedColor: "#ff9900"
		},
		messages: {
			giveaway: text1,
			giveawayEnded: text2,
			timeRemaining: lang.create.timeRemaining,
			inviteToParticipate: lang.create.inviteToParticipate,
			winMessage: lang.create.winMessage,
			embedFooter: lang.create.embedFooter,
			noWinner: lang.create.noWinner,
			hostedBy: lang.create.hostedBy,
			winners: lang.create.winners,
			drawing: lang.create.drawing,
			endedAt: lang.create.endedAt,
		 }
	}, message.delete({ timeout: 1000 }));
  }
  
}
