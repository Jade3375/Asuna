let Command = require("../../structures/command");

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
        if (row.data == null) this.client.db.addRow("server", message.guildID, {prefix: '%'})
        if(row.data.welcome == null) row.data.welcome = {}
        
        let embed = new this.Embed();
        let reg = /#[0-9a-f]{6}/

        if(!reg.test(args.join(" "))) return message.channel.createMessage("please provide a color in hex e.g. #ef42f5")

        let welcomeColor = args.join(" ").match(/#[0-9a-f]{6}/)[0]
        //message.channel.createMessage(`colour set to ${welcomeColor}`)
        

        embed.setTitle("set colour")
        embed.setDescription(`welcome colur set to \\<${welcomeColor}>`)
        embed.setColor(welcomeColor)
        row.data.welcome.colour = welcomeColor
        this.client.db.editRow("server", message.guildID, row.data).catch(e => {
            message.channel.createMessage("oops looks like an error occured if this continues let the developers know")
            console.error(`DB error: ${e}`)
        })
        message.channel.createMessage(embed.build())
    }
}
