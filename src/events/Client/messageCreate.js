const { MessageEmbed, Permissions } = require("discord.js");
const { findOrCreateUser, findOrCreateGuild } = require("../../handler/GuildData")
let cd = new Set(), cdseconds = "5";
module.exports = async (client, message) => {
  
	if (message.author.bot || !message.guild) return;

	const guildData = await findOrCreateGuild({ id: message.guild.id });

	const language = guildData.language;
	const lang = require(`../../language/${language}`);

    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		return message.channel.send(lang.myprefix.hello + "**" + `${message.author.tag}` + "**" + "," + lang.myprefix.prefixis(guildData));
	}


	//now we done prefix fetching for guilds
	if (!message.content.startsWith(guildData.prefix)) return;

	//Our standard argument/command name definition.
	const args = message.content.slice(guildData.prefix.length).trim().split(/ +/g), commandName = args.shift().toLowerCase();
	//Grab the command data from the client.commands Enmap
	const command = client.commands.get(commandName) || client.commands.find(x => x.aliases && x.aliases.includes(commandName));
	//If that command doesn't exist, silently exit and do nothing
	if (!command) return;

	//cooldown
	if (cd.has(message.author.id)) {
		message.delete();
		return message.channel.send(lang.cooldown.err).then(msg => msg.delete({ timeout: 6000 }).catch(() => {/* Lol */ }));
	}
	cd.add(message.author.id);
	setTimeout(() => cd.delete(message.author.id), cdseconds * 1000);

	 command.run(client, message, args, guildData, lang);

    }


