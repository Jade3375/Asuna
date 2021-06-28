let Command = require('../../structures/command');

class Hug extends Command {
    constructor (client) {
        super(client, {
            name: "hug",
            description: "hug someone",
            usage: "%hug [user]",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("👉👈  W-Why");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage(`<@!${message.author.id}> *tried to hug themselves*. Pathetic`)

        let mentioned = message.mentions[0].id;
        let img = await this.client.weeb.sfw("hug");
        let responses = ['How cute.', 'YAY! Hugs for all.', 'You better not hold hands next. 👉👈', 'Get a room?', 'Hawt!']
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has Hugged <@${mentioned}>. ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}
module.exports = Hug;