const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "invite",
            description: "shows bot invite links",
            usage: "%invite",
            aliases: []
        });
        this.client = client
    }

no
    async run(message, args) {
        let embed = new this.Embed()
        .setTitle("Bot Stats")
        .setDescription(`Invite me to your server using [this invite!](https://discord.com/api/oauth2/authorize?client_id=420907324945989632&permissions=1634234399990&scope=bot) \nIf you need help with the bot, join [our support server!](https://discord.gg/uyEQkTT )`)
        this.client.globalEmbedData(embed)
        
        message.channel.createMessage(embed.build())
    }

    async slash(inter){
        let embed = new this.Embed()
        .setTitle("Bot Stats")
        .setDescription(`Invite me to your server using [this invite!](https://discord.com/api/oauth2/authorize?client_id=420907324945989632&permissions=1634234399990&scope=bot) \nIf you need help with the bot, join [our support server!](https://discord.gg/uyEQkTT )`)
        .setTimestamp()
        
        inter.createMessage(embed.build())
    }

}
