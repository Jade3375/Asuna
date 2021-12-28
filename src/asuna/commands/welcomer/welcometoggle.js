let Command = require("../../structures/command");

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
        if (row.data == null) {
            this.client.db.addRow("server",  message.guildID, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
            row = await this.client.db.getRow("server", message.guildID);
        }

        if(row.data.welcome == null) row.data.welcome = {}
        
        let guild = row.data
        let embed = new this.Embed();
        let toggle

        if(!guild.welcome) guild.welcome = {}


        if(guild.welcome.toggle == true) toggle = "off"
        else toggle = "on"

        embed.setTitle("toggled welcome")
        embed.setDescription(`welcome messages are now ${toggle}`)

        if(toggle == "on") toggle = true
        else toggle = false

        row.data.welcome.toggle = row.data.welcome.toggle ? false : true
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }

    async slash(inter, data) {
        let perm = "manageGuild"
        let gObj = inter.channel.guild
        let userID = inter.member.id

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)

        let row = await this.client.db.getRow("server", inter.guildID);
        if (row.data == null) {
            this.client.db.addRow("server",  inter.guildID, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
            row = await this.client.db.getRow("server", inter.guildID);
        }

        if(row.data.welcome == null) row.data.welcome = {}
        
        let guild = row.data
        let embed = new this.Embed();
        let toggle

        if(!guild.welcome) guild.welcome = {}


        if(guild.welcome.toggle == true) toggle = "off"
        else toggle = "on"

        embed.setTitle("toggled welcome")
        embed.setDescription(`welcome messages are now ${toggle}`)

        if(toggle == "on") toggle = true
        else toggle = false

        row.data.welcome.toggle = row.data.welcome.toggle ? false : true
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", inter.guildID, row.data).catch(e => {
            inter.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        inter.createMessage(embed.build())
    }
}