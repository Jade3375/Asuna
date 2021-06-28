let Command = require('../../structures/command');

class Cookie extends Command {
    constructor (client) {
        super(client, {
            name: "cookie",
            description: "Give someone a cookie!",
            usage: "%cookie @someone",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("Thank you for the cookie!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage(`<@!${message.author.id}> why even give yourself a cookie.`)

        let mentioned = message.mentions[0].id;
        let embed = new this.Embed()
        .setImage("https://pa1.narvii.com/5664/0245ad6afd1b0eedc80ad359020c5bcb62216fa8_hq.gif")
        .setDescription(`<@${mentioned}> have a cookie. ^~^`)
        message.channel.createMessage(embed.build())

    }
}
module.exports = Cookie;

//https://pa1.narvii.com/5664/0245ad6afd1b0eedc80ad359020c5bcb62216fa8_hq.gif