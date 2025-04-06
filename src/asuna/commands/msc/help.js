const Command = require('../../structures/command');

class Help extends Command {
    constructor (client) {
        super(client, {
            name: "help",
            description: "do i have to explain this?",
            usage: "%help",
            aliases: []
        });
        this.client = client
    }

    async run (message, args) { // eslint-disable-line no-unused-vars
        let commands = {
            fun: [],
            img: [],
            msc: [],
            nsfw: [],
            music: [],
            mod: [],
            welcomer: []
        }
    
        this.client.commands.forEach(c => {
            if(!commands[c.help.category]) return
            commands[c.help.category].push(c.help.name)
        })
        
        let helpembed = new this.Embed()
                .setTitle("List of commands")
                .setColor('#FE55FE')
                .addField("Images", commands.img.join(', '), true)
                .addField("Nsfw", `${message.channel.nsfw ? commands.nsfw.join(', ') : 'Please run in a NSFW channel to view these commands'}`, true)
                .addField("Misc", commands.msc.join(', '), true)
                .addField("Moderator", commands.mod.join(', '), true)
                .addField("Music", commands.music.join(', '), true)
                .addField("Fun", commands.fun.join(', '), true)
                .addField("welcome" , commands.welcomer.join(', '), true)
                .addField("Links", "<:PPtransparent:457295151396814848>   [Donate](https://www.paypal.me/FloodL) \n:link:   [Invite](https://discord.com/api/oauth2/authorize?client_id=420907324945989632&permissions=1634234399990&scope=bot%20applications.commands) \n:link:   [Support](https://discord.gg/uyEQkTT ) \n:link:   [Vote](https://top.gg/bot/420907324945989632/vote) \n:link: [Guilded](https://www.guilded.gg/i/3kgGxPok)")
                this.client.globalEmbedData(helpembed)

        message.channel.createMessage(helpembed.build())
    }

    async slash(inter){
        let commands = {
            fun: [],
            img: [],
            msc: [],
            nsfw: [],
            music: [],
            mod: [],
            welcomer: []
        }
    
        this.client.commands.forEach(c => {
            if(!commands[c.help.category]) return
            commands[c.help.category].push(c.help.name)
        })
        
        let helpembed = new this.Embed()
                .setTitle("List of commands")
                .setColor('#FE55FE')
                .addField("Images", commands.img.join(', '), true)
                .addField("Nsfw", `${inter.channel.nsfw ? commands.nsfw.join(', ') : 'Please run in a NSFW channel to view these commands'}`, true)
                .addField("Misc", commands.msc.join(', '), true)
                .addField("Moderator", commands.mod.join(', '), true)
                .addField("Music", commands.music.join(', '), true)
                .addField("Fun", commands.fun.join(', '), true)
                .addField("welcome" , commands.welcomer.join(', '), true)
                .addField("Links", ":link:   [Invite](https://discord.com/api/oauth2/authorize?client_id=420907324945989632&permissions=1634234399990&scope=bot%20applications.commands) \n:link:   [Support](https://discord.gg/MegbvVz3Fx )")
                .setTimestamp()

        inter.createMessage(helpembed.build())
    }
}
module.exports = Help;
