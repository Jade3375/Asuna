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
            mod: []
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
                .addField("Links", "<:PPtransparent:457295151396814848>   [donate](https://www.paypal.me/FloodL) \n:link:   [bot invite](https://discord.com/oauth2/authorize?client_id=420907324945989632&permissions=2146824183&scope=bot%20applications.commands) \n:link:   [support server](https://discord.gg/uyEQkTT ) \n:link:   [vote](https://top.gg/bot/420907324945989632/vote) \n:link: [guilded](https://www.guilded.gg/i/3kgGxPok)")
                this.client.globalEmbedData(helpembed)

        message.channel.createMessage(helpembed.build())
    }
}
module.exports = Help;