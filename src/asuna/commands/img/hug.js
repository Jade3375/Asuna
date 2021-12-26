let Command = require('../../structures/command');

class Hug extends Command {
    constructor (client) {
        super(client, {
            name: "hug",
            description: "Hug someone!",
            usage: "%hug [@USER or USERID]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("👉👈  W-Why");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage(`<@!${message.author.id}> *tried to hug themselves*. Pathetic`)

        let mentioned = message.mentions[0].id;
        let img = await this.client.weeb.sfw("hug");
        let responses = ['How cute.', 'YAY! Hugs for all.', 'You better not hold hands next. 👉👈', 'Get a room you two.', 'Hawt!']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has hugged <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter) {
        if(inter.data.options[0].value == this.client.user.id) return inter.createMessage("👉👈  W-Why")
        if(inter.data.options[0].value == inter.member.id) return inter.createMessage(`<@!${inter.member.id}> *tried to hug themselves*. Pathetic`)

        let mentioned = inter.data.options[0].value
        let img = await this.client.weeb.sfw("hug")
        let responses = ['How cute.', 'YAY! Hugs for all.', 'You better not hold hands next. 👉👈', 'Get a room you two.', 'Hawt!']

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${inter.member.id}> has hugged <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
          .setTimestamp()
        inter.createMessage(embed.build());
    }
}
module.exports = Hug;