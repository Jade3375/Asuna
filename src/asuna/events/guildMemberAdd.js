const { fork } = require("child_process");

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild, member, opt) {
        if(global.dev && !opt.run) return
        
        this.client.users.clear()
        
        if(!member) return;
        
        let server = await this.client.db.getRow("server", guild.id)
        
        if(!server.data) return

        if(!server.data.welcome || !server.data.welcome.userPF) return this.reformat(server.data, guild.id, {guild, member, opt})
        
        if(server.data.welcome.toggle == false || server.data.welcome.toggle == undefined) return
        this.client.welcomes ++
        
        let channel = await guild.channels.get(server.data.welcome.channel)
        let members = guild.memberCount + ""
        let welcomemsg = server.data.welcome.message.replace("{server}", guild.name).replace("{atuser}", `<@${member.id}>`).replace("{username}", member.username).replace("{joinpos}", guild.memberCount)

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

        let child = fork(__dirname + '/../utils/imageGen.js', ['child'])
        child.on("message", (msg) => {
            channel.createMessage(welcomemsg , {file: Buffer.from(msg.img.data), name: "welcome.png"})
            child.removeAllListeners("message")
        })

        child.send({
                guildname:guild.name,
                canvasSize: server.data.welcome.canvasSize ? server.data.welcome.canvasSize : [500, 200], //2 element array of ints
                colour: server.data.welcome.colour ? server.data.welcome.colour : "#FFFFFF", //hex colour
                memberCount: `${guild.memberCount}${members}`, 
                BGImage: server.data.welcome.BGImage.src ? server.data.welcome.BGImage : "https://cdn.discordapp.com/attachments/436996481971388418/884475426204950598/FijIayy.png", //BG image data
                Text: server.data.welcome.text[0].text ? server.data.welcome.text : [{text: "welcome {username}", location: [160, 85], font: 'bold 24px "Helvet"'}, {text: "You are the {memberCount} member!", location: [160, 115], font: 'medium 24px "Helvet"'}], //array of text objects
                circles: server.data.welcome.circles ? server.data.welcome.circles : [{size: 48, location: [100,100]},{size: 46, location: [100,100]}], //array of circle objects
                userPF: {location: server.data.welcome.userPF.location ? server.data.welcome.userPF.location : [54,54,92,92], SRC: member.user.avatarURL, name: member.username} //user pf location and size data
        })
    }

    async reformat(data, guild, extra) {
        if(data.welcomeImage == null) data.welcomeImage = data.welcome.BGImage.src || "https://cdn.discordapp.com/attachments/436996481971388418/884475426204950598/FijIayy.png"
        let welcome = {
            message: data.welcomeMessage ? data.welcomeMessage : data.welcome.message,
            canvasSize: [500, 200],
            colour: data.welcomeColor ? data.welcomeColor : data.welcome.colour,
            BGImage: {
                src: data.welcomeImage ? data.welcomeImage : data.welcome.BGImage.src,
                location: [0,0]
            },
            text: [{text: "welcome {username}", location: [160, 85], font: 'bold 24px "Helvet"'}, {text: "You are the {memberCount} member!", location: [160, 115], font: 'medium 24px "Helvet"'}],
            circles:[{size: 48, location: [100,100]},{size: 46, location: [100,100]}],
            userPF: {location: [54,54,92,92]},
            channel: data.welcomeChannel ? data.welcomeChannel : data.welcome.channel,
            toggle: data.welcomeToggle ?  data.welcomeToggle : data.welcome.toggle
        }

        await this.client.db.editRow("server", guild, {welcome: welcome})
        this.run(extra.guild, extra.member, extra.opt)
    }

}