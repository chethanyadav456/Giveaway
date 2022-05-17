const { MessageEmbed, Client } = require("discord.js")
const { findOrCreateUser, findOrCreateGuild } = require("../../handler/GuildData");

module.exports = async (client, interaction) => {
	
  const guildData = await findOrCreateGuild({ id: interaction.guild.id });
	const language = guildData.language;
	const lang = require(`../../language/${language}`);

     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
	           
        try {
            await SlashCommands.run(client, interaction, lang, guildData);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;
        
}