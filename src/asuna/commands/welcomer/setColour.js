let Command = require("../../structures/command");
let util = require('util')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "setcolour",
            description: "customise the bots welcome message colour",
            usage: "%setcolour #colour",
            aliases: []
        });
        this.client = client;
    }

    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let row = await this.client.db.getRow("server", message.guildID);
        if (row.data == null) this.client.db.addRow("server", message.guildID, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
        
        let embed = new this.Embed();

        if(!args.join(" ").match(/#[0-9a-f]{6}/)[0] || !args[0]) return message.channel.createMessage("please provide a color in hex e.g. #ef42f5")

        let welcomeColor = args.join(" ").match(/#[0-9a-f]{6}/)[0]
        //message.channel.createMessage(`colour set to ${welcomeColor}`)
        

        embed.setTitle("set colour")
        embed.setDescription(`welcome colur set to <${welcomeColor}>`)
        embed.setColor(welcomeColor)
        this.client.db.editRow("server", message.guildID, {welcomeColor: welcomeColor}).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}
