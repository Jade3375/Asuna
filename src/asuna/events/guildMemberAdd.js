const { createCanvas, loadImage, registerFont } = require('canvas')
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
        
        this.welcome(guild, member, server)
    }

    async welcome (guild, member, server) {
        this.client.welcomes ++
        
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

        registerFont(__dirname + '/../fonts/Helvetica_Bold.ttf', {family: "Helvet", weight: "bold"})
        registerFont(__dirname + '/../fonts/Helvetica_Medium.ttf', {family: "Helvet", weight: "medium"})

        let canvas = createCanvas(500,200)
        let ctx = canvas.getContext('2d');
        let image = await loadImage(server.data.welcomeImage || "https://i.imgur.com/FijIayy.png")
        
        ctx.drawImage(image, 0,0)

        //make memory leak smaller for now
        image.onload = null
        image.onerror = null
        image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

        ctx.font = 'bold 24px "Helvet"'
        ctx.fillStyle = server.data.welcomeColor || "white"
        ctx.fillText(`Welcome ${member.username}!`, 160, 85)

        ctx.font = 'medium 24px "Helvet"'
        ctx.fillText(`you are the ${guild.memberCount}${members} member!`, 160, 115)

        ctx.beginPath();
        ctx.arc(100, 100, 48, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = server.data.welcomeColor || "white";
        ctx.fillRect(0, 0, 500,200)

        ctx.beginPath();
        ctx.arc(100, 100, 46, 0, Math.PI * 2);
        ctx.clip();

        image = await loadImage(member.avatarURL)
        ctx.drawImage(image, 54, 54, 92, 92)
        channel.createMessage(welcomemsg , {file: canvas.toBuffer("image/png"), name: "welcome.png"})
        //make memory leak smaller for now
        image.onload = null
        image.onerror = null
        image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
        canvas = null
        ctx = null
        image = null
    }
}