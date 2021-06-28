let Command = require('../../structures/command');
const fetch = require("node-fetch");

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "trap",
            description: "Lewds for all",
            usage: "%trap",
            nsfw: true,
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {

        if (message.channel.nsfw){
            fetch(`https://nekos.life/api/v2/img/trap`)
            .then(res => res.json())
            .then(json => {
                let responses = ['oh my thats lewd', 'ara ara', 'don\'t get all hot and bothered now']
                let embed = new this.Embed()
                .setColor("#FF69B4")
                .setDescription(`<@${message.author.id}> enjoy. ${responses[Math.floor(Math.random() * responses.length)]}`)
                .setImage(json.url)
                this.client.globalEmbedData(embed)
                message.channel.createMessage(embed.build())
            })
        }else message.channel.createMessage(":warning: This channel is not marked as NSFW :warning:")
    }
}