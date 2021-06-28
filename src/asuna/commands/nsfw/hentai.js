let Command = require('../../structures/command');
const fetch = require("node-fetch");

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "hentai",
            description: "Lewds for all",
            usage: "%hentai",
            nsfw: true,
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {

        if (message.channel.nsfw){
            fetch(`https://nekobot.xyz/api/image?type=hentai`)
            .then(res => res.json())
            .then(json => {
                let responses = ['oh my thats lewd', 'ara ara', 'don\'t get all hot and bothered now']
                let embed = new this.Embed()
                .setColor("#FF69B4")
                .setDescription(`<@${message.author.id}> enjoy. ${responses[Math.floor(Math.random() * responses.length)]}`)
                .setImage(json.message)
                this.client.globalEmbedData(embed)
                message.channel.createMessage(embed.build())
            })
        }else message.channel.createMessage(":warning: This channel is not marked as NSFW :warning:")
    }
}