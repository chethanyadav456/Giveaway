const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const { readdirSync } = require("fs");
const { path } = require("path");

class Giveaway extends Client {
	 constructor() {
        super({
              shards: "auto",
					    allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
              },
              partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
              intents: [
                   Intents.FLAGS.GUILDS,
                   Intents.FLAGS.GUILD_MEMBERS,
							     Intents.FLAGS.GUILD_MESSAGES, 
                   Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
               ],
            });
		 this.commands = new Collection();
     this.slashCommands = new Collection();
     this.config = require("./config.js");
     this.owner = this.config.ownerID;
     this.prefix = this.config.prefix;
     this.color = this.config.embeds.color;
     this.aliases = new Collection();
     this.commands = new Collection();
		 
     require('./handler/Giveaway')(this);
     if(!this.token) this.token = this.config.token;
   /**
    *  Mongose for data base
    */
		 const dbOptions = {
        useNewUrlParser: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        useUnifiedTopology: true,
      };
        mongoose.connect(this.config.mongodb, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
              console.log('Database connected');
              });
        mongoose.connection.on('err', (err) => {
                  console.log(`Mongoose connection error: \n ${err.stack}`);
              });
        mongoose.connection.on('disconnected', () => {
                  console.log('Mongoose disconnected');
              });
        
    /**
     * Error Handler
     */
    this.on("disconnect", () => console.log("Bot is disconnecting..."))
    this.on("reconnecting", () => console.log("Bot reconnecting..."))
    this.on('warn', error => console.log(error));
    this.on('error', error => console.log(error));
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));
	 
/**
 * Client Events
 */
	readdirSync("./src/events/Client/").forEach(file => {
    const event = require(`./events/Client/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Events Client ${eventName}`);
    this.on(eventName, event.bind(null, this));
});
/**
 * Erela Manager Events
 */ 
  readdirSync("./src/events/Giveaway/").forEach(file => {
    const event = require(`./events/Giveaway/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading Events Giveaway ${eventName}`);
    //this.giveawaysManager.on(eventName, event.bind(null, this));
    this.giveawaysManager.on(eventName, (...file) => event.execute(...file, this))
});
/**
 * Import all commands
 */
  readdirSync("./src/commands/").forEach(dir => {
    const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        console.log(`Loading ${command.category} commands ${command.name}`);
        this.commands.set(command.name, command);
    }
})
/**
 * SlashCommands 
 */
  const data = [];
       
  readdirSync("./src/slashCommands/").forEach((dir) => {
        const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    
        for (const file of slashCommandFile) {
            const slashCommand = require(`./slashCommands/${dir}/${file}`);

            if(!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

            if(!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

            this.slashCommands.set(slashCommand.name, slashCommand);
            console.log(`Client SlashCommands Command (/) Loaded: ${slashCommand.name}`, "cmd");
            data.push(slashCommand);
        }
     });
	  this.on("ready", async () => {
        await this.application.commands.set(data).then(() => console.log(`Client Application (/) Registered.`)).catch((e) => console.log(e));
    });
	 }
		 connect() {
        return super.login(this.token);
    };
};
module.exports = Giveaway;
