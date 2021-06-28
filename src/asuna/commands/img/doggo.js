let Command = require('../../structures/command');
let fetch = require("node-fetch")

class Doggo extends Command {
    constructor (client) {
        super(client, {
            name: "doggo",
            description: "Random cute doggo pics",
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
        .setDescription(`${user} have a cute doggo, Woof!`)
        .setImage(json.url)

        message.channel.createMessage(embed.build());
    }
    
}

module.exports = Doggo;