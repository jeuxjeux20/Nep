//coded by firec and cth103
var fs = require("fs")
const Eris = require("eris");
const commands = require("./commands.js");
var bot = new Eris("BOT_TOKEN");
var prefix = "n!";
let cmdlet = {};
//sorry tttie i'm a skid
let loadAll = function () {
    let fa = fs.readdirSync("./");
    for (let i = 0; i < fa.length; i++) {
        let cmF = fa[i];
        if (/.+\.js$/.test(cmF)) {
            let cmN = cmF.match(/(.+)\.js$/)[1]
            try {
                let cmFL = require("./cmd_" + cmN + ".js")
                if (cmFL.isCmd) {
                    console.log(`${__filename}      | Loading ${cmN} command, file ${cmF}`)
                    cmds[cmN.toLowerCase()] = cmFL;
                }
                else console.log(__filename + "    | Skipping non-command " + cmF)
            } catch (err) {
                console.error(`Error while loading command ${cmN}: ${err}`)
                console.error(err)
            }

        } else {
            console.log(__filename + "     | Skipping non-JS " + cmF)
        }
    }
}
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

bot.on("messageCreate", msg => {
	//took from TTtie, im sorry tttie
  if (msg.content.startsWith(prefix)) {
        var command = msg.content.slice(5)
        var commandName = command.split(" ")[0];
        var args = command.slice((commandName.length + 1))
        pol(msg);
        if (cmds[commandName]) {
            try {
                cmds[commandName](msg, bot)
            } catch (e) {
                console.error(e)
            }
        }
});
bot.connect();
