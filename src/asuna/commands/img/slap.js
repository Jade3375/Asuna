let Command = require('../../structures/command');

class Slap extends Command {
    constructor (client) {
        super(client, {
            name: "slap",
            description: "Slap someone",
            usage: "%slap [user]",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("Oi you little shit!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('Don\'t slap yourself idiot!')

        let kissed = message.mentions[0].id;
        let img = await this.client.weeb.sfw("slap");
        let responses = ['Haha.', 'YAY! Hit them more!', 'That must have hurt.', 'Hit them harder next time.', 'Hawt!', 'Kinky.', 'Weak.']
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has Slapped <@${kissed}>. ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}
module.exports = Slap;