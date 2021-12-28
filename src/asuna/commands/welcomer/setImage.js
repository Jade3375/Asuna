let Command = require("../../structures/command");

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "setimage",
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

        if(message.attachments[0] == undefined) return message.channel.createMessage("please send an image with that command")
        embed.setTitle("setImage")
        embed.setDescription("Image has been updated")
        embed.setImage(message.attachments[0].url)
        this.client.globalEmbedData(embed)
        row.data.welcome.BGImage = {src :message.attachments[0].url, location:[0,0]}
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
        let arg = data.options[0].value

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        let row = await this.client.db.getRow("server", inter.guildID);
        if (row.data == null) this.client.db.addRow("server", inter.guildID, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}

        let embed = new this.Embed();

        embed.setTitle("setImage")
        embed.setDescription("Image has been updated")
        embed.setImage(arg)
        this.client.globalEmbedData(embed)
        row.data.welcome.BGImage = {src :arg, location:[0,0]}
        this.client.db.editRow("server", inter.guildID, row.data).catch(e => {
            inter.createMessage("Oops! Looks like an error occured. If this continues let the developers know!")
            console.error(`DB error: ${e}`)
        })
        inter.createMessage(embed.build())
    }
}