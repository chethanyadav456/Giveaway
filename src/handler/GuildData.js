const Client = require("../../index");
const guildsData = require("../models/Guild");
const usersData = require("../models/User");

/**
 * 
 * @param {String} id 
 * @param {Client} client
 * @returns {String}
 */
	
  async function findOrCreateGuild(param, isLean) {
		const Guild = guildsData;
		return new Promise(
			async function (resolve, reject) {
				let guild = (isLean ? await Guild.findOne(param).lean() : await Guild.findOne(param));
				if (guild) {
					resolve(guild);
				} else {
					guild = new Guild(param);
					await guild.save();
					resolve(isLean ? guild.toJSON() : guild);
				}
			});
	}

	async function findOrCreateUser(param, isLean) {
		const User = usersData;
		return new Promise(
			async function (resolve, reject) {
				let user = (isLean ? await User.findOne(param).lean() : await User.findOne(param));
				if (user) {
					resolve(user);
				} else {
					user = new User(param);
					await user.save();
					resolve(isLean ? user.toJSON() : user);
				}
			});
	}
module.exports = {
  findOrCreateUser,
  findOrCreateGuild
};
