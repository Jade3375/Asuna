let Command = require('../../structures/command');

class Slap extends Command {
    constructor (client) {
        super(client, {
            name: "slap",
            description: "Slap someone!",
            usage: "%slap [@USER or USERID]",
            aliases: ["bitchslap"]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("Oi you little shit!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('Don\'t slap yourself idiot!')

        let mentioned = message.mentions[0].id;
        let img = await this.client.weeb.sfw("slap");
        let responses = ['Haha.', 'YAY! Hit them more!', 'That must have hurt.', 'Hit them harder next time.', 'Hawt!', 'Kinky.', 'Weak.']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has Slapped <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter, data){
        
        if(data.options[0].value == this.client.user.id) return inter.createMessage("Oi you little shit!");
        if(data.options[0].value == inter.member.id) return inter.createMessage('Don\'t slap yourself idiot!')

        let img = await this.client.weeb.sfw("slap");
        let responses = ['Haha.', 'YAY! Hit them more!', 'That must have hurt.', 'Hit them harder next time.', 'Hawt!', 'Kinky.', 'Weak.']

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${inter.member.id}> has slapped <@${data.options[0].value}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(img)
          .setTimestamp()
        inter.createMessage(embed.build());

    }
}
module.exports = Slap;