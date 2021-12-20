const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "vote",
            description: "vote link",
            usage: "%vote",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let embed = new this.Embed()
        .setTitle("Bot Voting")
        .setDescription(`Feel free to vote for asuna on [top.gg](https://top.gg/bot/420907324945989632) and gain voting benefits `)
        this.client.globalEmbedData(embed)
        
        message.channel.createMessage(embed.build())

    }

}