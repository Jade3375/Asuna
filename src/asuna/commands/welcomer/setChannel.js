let Command = require("../../structures/command");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "setchannel",
            description: "customise the bots welcome channel",
            usage: "%setchannel #channel",
            aliases: []
        });
        this.client = client;
    }

    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let row = await this.client.db.getRow("server", message.guildID);
        if (row.data == null) this.client.db.addRow("server", message.guild, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}
        
        let embed = new this.Embed();

        if(!args[0]) return message.channel.createMessage("please select a channel to send welcome messages to")
        let welcomeChannel = message.content.match(/<#(\d+)>$/)[1]

        embed.setTitle("set channel")
        embed.setDescription(`welcome channel set to <#${welcomeChannel}>`)
        row.data.welcome.channel = welcomeChannel
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }

    async slash(inter, data){
        let perm = "manageGuild"
        let gObj = inter.channel.guild
        let userID = inter.member.id
        let welcomeChannel = data.options[0].value

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        //if(!this.checkPermInter(this.client.user.id, gObj, perm)) return inter.createMessage(`I do not have the *${perm}* permission.`) //Bot perm check

        let row = await this.client.db.getRow("server", inter.guildID);
        if (row.data == null) this.client.db.addRow("server", inter.guildID, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}
        
        let embed = new this.Embed();

        embed.setTitle("set channel")
        embed.setDescription(`welcome channel set to <#${welcomeChannel}>`)
        row.data.welcome.channel = welcomeChannel
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", inter.guildID, row.data).catch(e => {
            inter.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        inter.createMessage(embed.build())

    }
}