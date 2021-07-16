
module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild, member) {
        if(!member) return;
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

        registerFont(__dirname + '/../fonts/Helvetica_Bold.ttf', {family: "Helvet", weight: "bold"})
        registerFont(__dirname + '/../fonts/Helvetica_Medium.ttf', {family: "Helvet", weight: "medium"})

        const canvas = createCanvas(500,200)
        const ctx = canvas.getContext('2d');

        //ToDo: replace image url with image url / path from DB
        loadImage(server.data.welcomeImage).then(image => {
            ctx.drawImage(image, 0,0)

            //
            ctx.font = 'bold 24px "Helvet"'
            ctx.fillStyle = "white"
            ctx.fillText(`Welcome ${member.username}!`, 160, 85)

            ctx.font = 'medium 24px "Helvet"'
            ctx.fillText(`you are the ${guild.memberCount}${members} member!`, 160, 115)

            ctx.beginPath();
            ctx.arc(100, 100, 48, 0, Math.PI * 2);
            ctx.clip();

            ctx.fillStyle = 'white';
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
}