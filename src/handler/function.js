const { Message, MessageEmbed, TextChannel, MessageActionRow, MessageButton, CommandInteraction, Permissions, Collection, ButtonInteraction, SelectMenuInteraction, User } = require("discord.js");
const Client = require("../../index");
/**
 * 
 * @param {String} id 
 * @param {Client} client
 * @returns {String}
 */
const { color } = client.color;
/**
 * 
 * @param {TextChannel} channel 
 * @param {String} args 
 * @param {String} color
 */

async function oops(channel, args, color) {
    try {
        let embed1 = new MessageEmbed().setColor(color ? color : "BLURPLE").setDescription(`${args}`);

        const m = await channel.send({
            embeds: [embed1]
        });

        setTimeout(async () => await m.delete().catch(() => {}), 12000);
    } catch (e) {
        return console.error(e)
    }
};

/**
 * 
 * @param {TextChannel} channel 
 * @param {String} args 
 * @param {String} color 
 * @returns {Promise<void | Message}
 */

async function good(channel, args, color) {
    color = color ? color : "BLURPLE";
    return await channel.send({
        embeds: [new MessageEmbed().setColor(color).setDescription(`${args}`)]
    }).catch(() => {});
};
module.exports = {
  oops,
  good
}