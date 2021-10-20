let Command = require('../../structures/command');

class Pat extends Command {
    constructor (client) {
        super(client, {
            name: "pat",
            description: "Give someone a pat!",
            usage: "%pat [@USER]",
            aliases: ["headpat"]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("Yay thank you for the pats!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('Giving yourself a pat on the back ay?')

        let mentioned = message.mentions[0].id;
        let res = await fetch("https://rra.ram.moe/i/r?type=pat");
        let json = await res.json();
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room.', 'Hawt!', 'Why?', 'C-Can I have one?']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has pet <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(`https://rra.ram.moe${json.path}`)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}
module.exports = Pat;