let Command = require('../../structures/command');

class Kiss extends Command {
    constructor (client) {
        super(client, {
            name: "kiss",
            description: "Kiss someone!",
            usage: "%kiss [@USER or USERID]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("H-Hey >~< That's pretty lewd :flushed:");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('Awe you seem pretty lonely, How sad.')

        let kissed = message.mentions[0].id;
        let img = await this.client.weeb.sfw("kiss");
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room.', 'Hawt!', 'Why?', 'C-Can I have one?']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has kissed <@${kissed}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter, data) {
        if(data.options[0].value == this.client.user.id) return inter.createMessage("H-Hey >~< That's pretty lewd :flushed:")
        if(data.options[0].value == inter.member.id) return inter.createMessage("Awe you seem pretty lonely, How sad.")

        let mentioned = data.options[0].value
        let img = await this.client.weeb.sfw("kiss")
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room.', 'Hawt!', 'Why?', 'C-Can I have one?']

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${inter.member.id}> has kissed <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
          .setTimestamp()
        inter.createMessage(embed.build());
    }
}

module.exports = Kiss;