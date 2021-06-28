let Command = require('../../structures/command');
let fetch = require("node-fetch")

class Waifu extends Command {
    constructor (client) {
        super(client, {
            name: "waifu",
            description: "random waifus",
            usage: "%waifu",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        let user = message.author.username
        let res = await fetch(`https://nekos.life/api/v2/img/waifu`)
        let json = await res.json()

        let embed = new this.Embed()
        .setDescription(`${user} here is your new waifu.`)
        .setImage(json.url)

        message.channel.createMessage(embed.build());
    }
    
}

module.exports = Waifu;