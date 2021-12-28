let Command = require('../../structures/command');
let fetch = require("node-fetch")

class Waifu extends Command {
    constructor (client) {
        super(client, {
            name: "waifu",
            description: "Get a random anime waifu!",
            usage: "%waifu",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let user = message.author.username
        let res = await fetch(`https://nekos.life/api/v2/img/waifu`)
        let json = await res.json()

        let embed = new this.Embed()
          .setDescription(`Here is your new waifu ${user}!`)
          .setImage(json.url)
        message.channel.createMessage(embed.build());
    }

    async slash(inter){
        let res = await fetch(`https://nekos.life/api/v2/img/waifu`)
        let json = await res.json()

        let embed = new this.Embed()
          .setDescription(`Here is your new waifu, <@${inter.member.id}>!`)
          .setImage(json.url)
          .setTimestamp()
        inter.createMessage(embed.build());

    }
    
}
module.exports = Waifu;