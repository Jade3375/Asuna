let Command = require('../../structures/command');
let fetch = require("node-fetch")

class OwO extends Command {
    constructor (client) {
        super(client, {
            name: "owo",
            description: "OwO what's this?",
            usage: "%owo",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let res = await fetch("https://rra.ram.moe/i/r?type=owo");
        let json = await res.json();

        let embed = new this.Embed()
          .setDescription(`OwO what's this?`)
          .setImage(`https://rra.ram.moe${json.path}`)
        message.channel.createMessage(embed.build());
    }

    async slash(inter){
        let res = await fetch("https://rra.ram.moe/i/r?type=owo")
        let json = await res.json()
        let data = json.path;

        let embed = new this.Embed()
            .setDescription(`OwO what's this?`)
          .setImage("https://rra.ram.moe" + data)
          .setTimestamp()
        inter.createMessage(embed.build());
    }
}
module.exports = OwO;