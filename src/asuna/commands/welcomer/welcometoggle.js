let Command = require("../../structures/command");
let util = require('util')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "welcometoggle",
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
        if (row.data == null) this.client.db.addRow("server", guild, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
        
        let guild = row.data
        let embed = new this.Embed();
        let toggle

        if(guild.welcomeToggle == true) toggle = "off"
        else toggle = "on"

        embed.setTitle("toggled welcome")
        embed.setDescription(`welcome messages are now ${toggle}`)
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", message.guildID, {welcomeToggle: !guild.welcomeToggle}).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}