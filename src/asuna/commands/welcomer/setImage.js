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
        
        let embed = new this.Embed();

        if(message.attachments[0] == undefined) return message.channel.createMessage("please send an image with that command")
        embed.setTitle("setImage")
        embed.setDescription("Image has been updated")
        embed.setImage(message.attachments[0].url)
        this.client.globalEmbedData(embed)
        row.data.welcome.BGImage = {BGImage: {SRC:message.attachments[0].url, location:[0,0]}}
        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}