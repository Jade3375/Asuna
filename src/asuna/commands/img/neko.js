let Command = require('../../structures/command');

class Neko extends Command {
    constructor (client) {
        super(client, {
            name: "neko",
            description: "nekos for all",
            usage: "%neko",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        let img = await this.client.weeb.sfw("neko");
        let responses = ['Thats cute.', 'Don\'t lewd her.', 'Give her headpats.', 'Is that you?', 'Is that you? Wait nah it\'s too cute to be you.']
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> have a cute neko. ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}
module.exports = Neko;