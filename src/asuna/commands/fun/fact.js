let Command = require('../../structures/command');

class Fact extends Command {
    constructor (client) {
        super(client, {
            name: "fact",
            description: "get a random fact",
            usage: "%fact",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
       let res = await fetch("https://nekos.life/api/v2/fact")
       let json = res.json()
       let fact = json.fact

       let embed = new this.Embed()
       .setDescription(`Your random fact is **${fact}**!`)

       message.channel.createMessage(embed.build())
    }
}
module.exports = Fact;