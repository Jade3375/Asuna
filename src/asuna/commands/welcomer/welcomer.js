let Command = require("../../structures/command");
let util = require('util')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "welcomer",
            description: "customise the bots welcome messsage / image",
            usage: "%welcomer {option} [data]",
            aliases: []
        });
        this.client = client;
    }

    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let row = await this.client.db.getRow("server", message.guildID);
        if (row.data == null) 
            return;
        
        let guild = row.data
        let embed = new this.Embed();



        switch (args[0]) {
            case "image":
                if(!args[1] && !message.attachments[0]) return message.channel.createMessage("please provide an image to use or select one of the existing images (500x200px)")
                if(parseInt(args[1]) != NaN && message.attachments[0] == undefined) {
                    guild.welcomeImage = parseInt(args[1])
                    message.channel.createMessage(`image set as welcome image!`)
                }
                else {
                    if(message.attachments[0] == undefined) return message.channel.createMessage("please send an image with that command")
                    guild.welcomeImage = message.attachments[0].url
                    message.channel.createMessage(`image set as welcome image!`)
                }
            break;
            case "welcomemessage":
                if(!args[1]) return message.channel.createMessage("please provide text for the welcome message, \n{server} = server name \n {username} = members name \n {atuser} = the users @ \n{joinpos} = join position")
                guild.welcomeMessage = message.content.split("msg")[1]
                message.channel.createMessage(`welcome message set!`)
            break;
            case "channel":
                if(!args[1]) return message.channel.createMessage("please select a channel to send welcome messages to")
                guild.welcomeChannel = message.content.match(/<#(\d+)>$/)[1]
                message.channel.createMessage(`welcome channel set to <#${guild.welcomeChannel}>`)
            break;
            case "enable":
                guild.welcomeToggle = true
                message.channel.createMessage("welcome messages are on")
            break;
            case "disable":
                guild.welcomeToggle = false
                message.channel.createMessage("welcome messages are off")
            break;
            case "test":
                if(guild.welcomeChannel == "" || !guild.welcomeChannel) return message.channel.createMessage("no welcome channel set")
                this.test(message.member.guild, message.member)
                message.channel.createMessage("sending test welcome to set channel")
            break;
            case "colour":
                if(!args.join(" ").match(/#[0-9a-f]{6}/)[0]) return message.channel.createMessage("please provide a color in hex e.g. #ef42f5")
                else {
                    guild.welcomeColor = args.join(" ").match(/#[0-9a-f]{6}/)[0]
                    message.channel.createMessage(`colour set to ${guild.welcomeColor}`)
                    }

            break;

            default: embed.setTitle("Welcomer help");
                embed.addField("arguments", "image, set the welcome image to use: welcomer image + image (500px by 200px for best results) \nwelcomemessage, set the welcome message: welcomer msg welcome {user} to {server}");
                message.channel.createMessage(embed.build());
            break;
        }

        if(args[0] == "test") return
        else this.client.db.editRow("server", message.guildID, {welcomeChannel: guild.welcomeChannel, welcomeMessage: guild.welcomeMessage, welcomeToggle: guild.welcomeToggle, welcomeImage: guild.welcomeImage, welcomeColor: guild.welcomeColor || white})

    }

    async test(guild, member) {
        let server = await this.client.db.getRow("server", guild.id)
        console.log(server.data)
        if(!server.data || server.data == null) return
        if(server.data.welcomeToggle == false) return
        let channel = await guild.channels.get(server.data.welcomeChannel)
        let members = guild.memberCount + ""

        let welcomemsg = server.data.welcomeMessage.replace("{server}", guild.name).replace("{atuser}", `<@${member.id}>`)

        switch (members.substr(-1)) {
            case "1":
                members = "st"
                break;
            case "2":
                members = "nd"
                break;

            case "3":
                members = "rd"
                break;
        
            default:
                members = "th"
                break;
        }

        const { createCanvas, loadImage, registerFont } = require('canvas')
        const fs = require('fs')

        registerFont(__dirname + '/../../fonts/Helvetica_Bold.ttf', {family: "Helvet", weight: "bold"})
        registerFont(__dirname + '/../../fonts/Helvetica_Medium.ttf', {family: "Helvet", weight: "medium"})

        const canvas = createCanvas(500,200)
        const ctx = canvas.getContext('2d');

        //ToDo: replace image url with image url / path from DB
        loadImage(server.data.welcomeImage).then(image => {
            ctx.drawImage(image, 0,0)

            //
            ctx.font = 'bold 24px "Helvet"'
            ctx.fillStyle = "#ef42f5"
            ctx.fillText(`Welcome ${member.username}!`, 160, 85)

            ctx.font = 'medium 24px "Helvet"'
            ctx.fillText(`you are the ${guild.memberCount}${members} member!`, 160, 115)

            ctx.beginPath();
            ctx.arc(100, 100, 48, 0, Math.PI * 2);
            ctx.clip();

            ctx.fillStyle = '#ef42f5';
            ctx.fillRect(0, 0, 500,200)

            ctx.beginPath();
            ctx.arc(100, 100, 46, 0, Math.PI * 2);
            ctx.clip();

            loadImage(member.avatarURL).then(image => {
                ctx.drawImage(image, 54, 54, 92, 92)
                const buffer = canvas.toBuffer("image/png")
                channel.createMessage(welcomemsg , {file: buffer, name: "welcome.png"})
            })

        })
    }
};
