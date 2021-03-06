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


    async run(message, args) {
        let embed = new this.Embed()
        .setTitle("Bot Stats")
        .setDescription(`Invite me to your server using [this invite](https://discord.com/oauth2/authorize?client_id=420907324945989632&permissions=2146824183&scope=bot%20applications.commands) \nIf you need help with the bot join [here](https://discord.gg/uyEQkTT )`)
        this.client.globalEmbedData(embed)
        
        message.channel.createMessage(embed.build())
    }

}