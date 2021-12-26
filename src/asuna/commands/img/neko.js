let Command = require('../../structures/command');

class Neko extends Command {
    constructor (client) {
        super(client, {
            name: "neko",
            description: "Get a random catgirl pic!",
            usage: "%neko",
            aliases: ["catgirl"]
        });
        this.client = client
    }

    async run(message, args) {
        let img = await this.client.weeb.sfw("neko");
        let responses = ['Thats cute.', 'Don\'t lewd her.', 'Give her headpats.', 'Is that you?', 'Is that you? Wait nah it\'s too cute to be you.']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`Have a cute neko! <@${message.author.id}> ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter){

        let img = await this.client.weeb.sfw("neko");
        let responses = ['Thats cute.', 'Don\'t lewd her.', 'Give her headpats.', 'Is that you?', 'Is that you? Wait nah it\'s too cute to be you.']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`Have a cute neko! <@${inter.member.id}> ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
          .setTimestamp()
        inter.createMessage(embed.build());

    }
}
module.exports = Neko;