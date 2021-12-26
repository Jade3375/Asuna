let Command = require('../../structures/command');
let fetch = require("node-fetch")

class Nya extends Command {
    constructor (client) {
        super(client, {
            name: "nya",
            description: "Nya?",
            usage: "%nya",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let res = await fetch("https://rra.ram.moe/i/r?type=nyan");
        let json = await res.json();

        let embed = new this.Embed()
          .setDescription(`Nya?`)
          .setImage(json.url)
        message.channel.createMessage(embed.build());
    }

    async slash(inter) {
        let res = await fetch("https://rra.ram.moe/i/r?type=nyan")
        let json = await res.json()
        let data = json.path;

        let embed = new this.Embed()
            .setDescription(`Nya?`)
          .setImage("https://rra.ram.moe" + data)
          .setTimestamp()
        inter.createMessage(embed.build());
    }
}
module.exports = Nya;