let Command = require('../../structures/command');
let fetch = require("node-fetch")

class Doggo extends Command {
    constructor (client) {
        super(client, {
            name: "doggo",
            description: "Get a random cut dog pic!",
            usage: "%doggo",
            aliases: ["dog"]
        });
        this.client = client
    }

    async run(message, args) {
        let user = message.author.username
        let res = await fetch(`https://random.dog/woof.json`)
        let json = await res.json()

        let embed = new this.Embed()
          .setDescription(`Have a cute doggo! ${user}`)
          .setImage(json.url)
        message.channel.createMessage(embed.build());
    }

    async slash(inter){
        let user = inter.member.username
        let res = await fetch(`https://random.dog/woof.json`)
        let json = await res.json()

        let embed = new this.Embed()
          .setDescription(`Have a cute doggo, ${user}!`)
          .setImage(json.url)
          .setTimestamp()
        inter.createMessage(embed.build());
    }
    
}
module.exports = Doggo;