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
        
        let guild = row.data
        let embed = new this.Embed();
        let toggle

        if(!guild.welcome) guild.welcome = {}

        console.log(guild)

        if(guild.welcomeToggle === true|| guild.welcome.toggle === true || !guild.welcome.toggle) toggle = "off"
        else toggle = "on"

        embed.setTitle("toggled welcome")
        embed.setDescription(`welcome messages are now ${toggle}`)
        row.data.welcome.toggle = toggle
        this.client.globalEmbedData(embed)
        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}