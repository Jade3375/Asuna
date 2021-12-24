let Command = require('../../structures/command');
let zLib = require('zlib');

class Fact extends Command {
    constructor (client) {
        super(client, {
            name: "fact",
            description: "Get a random fact!",
            usage: "%fact",
            aliases: []
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

    async slash(inter) {
        let res = await fetch("https://nekos.life/api/v2/fact")
        console.log(res)
        //let json = res.json()
        zLib.unzip(res.body._outBuffer, (err, buf) => {
            console.log(buf)
          })
        //let fact = json.fact

        let embed = new this.Embed()
          .setDescription(`Your random fact is **${JSON.stringify(res.json())}**!`)
        inter.createMessage(embed.build())
    }
}
module.exports = Fact;