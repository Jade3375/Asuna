let Command = require('../../structures/command');

class Poke extends Command {
    constructor (client) {
        super(client, {
            name: "poke",
            description: "Poke someone!",
            usage: "%poke [@USER or USERID]",
            aliases: ["jab"]
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("DON'T POKE MEEEEEEEEE!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('You feeling okay?')

        let mentioned = message.mentions[0].id;
        let res = await fetch("https://rra.ram.moe/i/r?type=poke");
        let json = await res.json();
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room.', 'Hawt!', 'Why?', 'C-Can I have one?']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has poked <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(`https://rra.ram.moe${json.path}`)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter) {

        if(inter.data.options[0].value == this.client.user.id) return inter.createMessage("DON'T POKE MEEEEEEEEE!")
        if(inter.data.options[0].value == inter.member.id) return inter.createMessage(`You feeling okay?`)

        let res = await fetch("https://nekos.life/api/v2/img/poke");
        let json = await res.json();
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room.', 'Hawt!', 'Why?', 'C-Can I have one?']

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${inter.member.id}> has poked <@${inter.data.options[0].value}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(`${json.url}`)
          .setTimestamp()
        inter.createMessage(embed.build());

    }
}
module.exports = Poke;
