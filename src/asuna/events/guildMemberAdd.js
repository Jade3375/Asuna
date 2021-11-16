const { createCanvas, loadImage, registerFont } = require('canvas')
const { fork } = require("child_process");
const fs = require('fs')

module.exports = class {
    constructor (client) {
        this.client = client;

        this.controller = new AbortController()
        this.signal = controller;
        this.child

        this.createChild()
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

        let controller = new AbortController();
        let { signal } = controller;
        let child = fork(__dirname + '/../util/imageGen.js', ['child'], { signal })
        this.child.on("message", (msg) => {
            channel.createMessage(welcomemsg , {file: Buffer.from(msg.img.data), name: "welcome.png"})
            child.removeAllListeners("message")
        })

        child.send({data: {
            canvasSize: [],
            colour: "",
            BGImage: {
                src: "",
                location: [],
            },
            imgText: {
                font: "",
                location: [],
                txt: ""
            },
            circle: {
                size: 0,
                location: []
            },
            circle2: {
                size: 0,
                location: []
            },
            userPF: {
                src: "",
                location: []
            }
        }})
    }

    createChild() {
        this.child = fork(__dirname + '/../util/imageGen.js', ['child'], { signal })
        this.child.on("close", () => {
            this.child.removeAllListeners("close")
            this.createChild()
        })
    }

}