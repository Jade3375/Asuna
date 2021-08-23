let Command = require("../../structures/command");
let util = require('util')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "setmessage",
            description: "customise the bots image",
            usage: "%setimage {image}",
            aliases: []
        });
        this.client = client;
    }

    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let row = await this.client.db.getRow("server", message.guildID);
        if (row.data == null) this.client.db.addRow("server", guild, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
        
        let embed = new this.Embed();

        if(!args[0]) return message.channel.createMessage("please provide text for the welcome message, \n{server} = server name \n{username} = members name \n{atuser} = the users @ \n{joinpos} = join position")

        embed.setTitle("Welcome messsage")
        embed.setDescription(`welcome message set to \n${args.join(" ")}`)
        this.client.globalEmbedData(embed)

        this.client.db.editRow("server", message.guildID, {welcomeMessage: args.join(" ")}).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}