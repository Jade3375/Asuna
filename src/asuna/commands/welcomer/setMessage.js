let Command = require("../../structures/command");

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
        if (row.data == null) this.client.db.addRow("server", guild, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}
        
        let embed = new this.Embed();

        if(!args[0]) return message.channel.createMessage("please provide text for the welcome message, \n{server} = server name \n{username} = members name \n{atuser} = the users @ \n{joinpos} = join position")

        embed.setTitle("Welcome messsage")
        embed.setDescription(`welcome message set to \n${args.join(" ")}`)
        this.client.globalEmbedData(embed)
        row.data.welcome.message = args.join(" ")

        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }

    async slash(inter) {
        let perm = "manageGuild"
        let gObj = inter.channel.guild
        let userID = inter.member.id
        let arg = inter.data.options[0].value

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        let row = await this.client.db.getRow("server", inter.guildID);
        if (row.data == null) this.client.db.addRow("server", inter.guildID, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}
        let embed = new this.Embed();
        embed.setTitle("Welcome Messsage")
        embed.setDescription(`Welcome message set to \n${arg}`)
        this.client.globalEmbedData(embed)
        row.data.welcome.message = arg

        this.client.db.editRow("server", inter.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        inter.createMessage(embed.build())
    }
}