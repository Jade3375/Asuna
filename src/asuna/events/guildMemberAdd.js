const { createCanvas, loadImage, registerFont } = require('canvas')
const { fork } = require("child_process");
const fs = require('fs')

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild, member, opt) {
        if(global.dev && !opt.run) return
        
        this.client.users.clear()
        
        if(!member) return;
        
        let server = await this.client.db.getRow("server", guild.id)
        
        if(!server.data || server.data == null) return
        
        if(server.data.welcomeToggle == false || server.data.welcomeToggle == undefined) return

        let channel = await guild.channels.get(server.data.welcomeChannel)
        let members = guild.memberCount + ""
        let welcomemsg = server.data.welcomeMessage.replace("{server}", guild.name).replace("{atuser}", `<@${member.id}>`).replace("{username}", member.username).replace("{joinpos}", guild.memberCount)

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

        //console.log(server.data.welcome)
        child.send({
                guildname:guild.name,
                canvasSize: server.data.welcome.canvasSize, //2 element array of ints
                colour: server.data.welcome.colour, //hex colour
                memberCount: `${guild.memberCount}${members}`, 
                BGImage: server.data.welcome.BGImage, //BG image data
                Text: server.data.welcome.Text, //array of text objects
                circles: server.data.welcome.circles, //array of circle objects
                userPF: {location: server.data.welcome.userPF.location, SRC: member.user.avatarURL, name: member.username} //user pf location and size data
        })
    }

}