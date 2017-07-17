//coded by firec and cth103
const Eris = require("eris");
const commands = require("./commands");
var bot = new Eris("BOT_TOKEN");

bot.on("ready", () => { 
    console.log("I am ready, BEEP BOOP."); // log when the bot is ready
});
bot.on("guildCreate", svr => {
	console.log("New Server : " + svr.name); //log when the bot gets added to a new guild
});
bot.on("guildDelete", (svr, unavailable) => {
   console.log("I was deleted in  " + svr.name +". Fuck those dudes."); //log when the bot gets kicked/banned or the guild gets deleted
});

bot.on("channelDelete", (ch, svr) => {
	console.log("Channel " + ch.name +" was deleted in the server" + svr.name);
});

bot.on("guildMemberRemove", (svr, member) => {
   console.log("This nigga " + member.name +" was banned in " + svr.name);		
});

bot.on("guildBanAdd", (svr, usr) => {
   console.log("On the chaos named " + svr.name +" an person named " + usr.name + " was banned.");
});

bot.on("guildBanRemove", (svr, usr) => {
    console.log("Oh well guess what in " + svr.name +" they unbanned " + usr.name);
});
bot.on("messageUpdate", (newMsg, oldMsg) => {
   console.log("Message was edited from " + oldMsg.content +" to " + newMsg.content);
});
bot.on("messageDelete", msg => {
  console.log("Message deleted, contents: " + msg.content);
});

