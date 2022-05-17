const { MessageEmbed, CommandInteraction, Client } = require("discord.js");

const messages = require("../../utils/message");
const ms = require("ms");
module.exports = {
  name: 'start',
  description: 'To start a giveaways',

  options: [
    {
      name: 'duration',
      description: 'How long the giveaway should last for. Example values: 1m, 1h, 1d',
      type: 'STRING',
      required: true
    },
    {
      name: 'winners',
      description: 'How many winners the giveaway should have',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'prize',
      description: 'What the prize of the giveaway should be',
      type: 'STRING',
      required: true
    },
    {
      name: 'channel',
      description: 'The channel to start the giveaway in',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Role which would recieve bonus entries',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusamount',
      description: 'The amount of bonus entries the role will recieve',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invite',
      description: 'Invite of the server you want to add as giveaway joining requirement',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Role you want to add as giveaway joining requirement',
      type: 'ROLE',
      required: false
    },
  ],
	/**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */


  run: async (client, interaction, lang, guildData) => {
   
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.get(guildData.plugins.role.role)) {
      return interaction.reply({
        content: lang.create.perms,
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: lang.create.channel,
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: lang.create.duration,
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: lang.create.argswinners,
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `${lang.create.brole} ${bonusRole}`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#2F3136",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: lang.create.invitetitle,
            url: "https://discord.com/api/oauth2/authorize?client_id=648587571407880225&permissions=380373518400&scope=bot%20applications.commands",
            description: lang.create.invitedes,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Only members having ${rolereq} are allowed to participate in this giveaway!\n- Members are required to join [this server](${invite}) to participate in this giveaway!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**React with 🎉 to participate!**\n>>> - Members are required to join [this server](${invite}) to participate in this giveaway!`
    }

 	if (guildData.plugins.mention.enabled) {
		var text1 = "@everyone\n\n" + lang.create.giveaway;
		var text2 = "@everyone\n\n" + lang.create.giveawayEnded;
	}

	if (!guildData.plugins.mention.enabled) {
		var text1 = lang.create.giveaway;
		var text2 = lang.create.giveawayEnded;
	}
  client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayWinnerCount),
      hostedBy: client.config.giveaway.hostedBy ? interaction.member.user : null,
  		lastChance: {
			enabled: client.config.giveaway.lastchanceenabled,
			content: lang.lastchance.content,
			threshold: 20000,
			embedColor: "#7B98EE"
		},
      bonusEntries: [
        {
         
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`Bonus Entries Alert!`)
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries in this giveaway!`
        )
        .setColor("#2F3136")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }
  }
}