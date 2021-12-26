let Command = require('../../structures/command');

class Tickle extends Command {
    constructor (client) {
        super(client, {
            name: "tickle",
            description: "Tickle someone!",
            usage: "%tickle [@USER or USERID]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        if (message.mentions.length == 0) return message.channel.createMessage("You need to mention someone.");

        if (message.mentions[0].id == this.client.user.id) return message.channel.createMessage("N-nuh my only weakness!");

        if (message.mentions[0].id == message.author.id) return message.channel.createMessage('Why are you even trying?')

        let mentioned = message.mentions[0].id;
        let res = await fetch("https://rra.ram.moe/i/r?type=tickle");
        let json = await res.json();
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room you two.', 'Hawt!', 'Why?', 'C-Can I have one?']
        
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${message.author.id}> has tickled <@${mentioned}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(`https://rra.ram.moe${json.path}`)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }

    async slash(inter){

        if(inter.data.options[0].value == this.client.user.id) return inter.createMessage("N-nuh my only weakness!");
        if(inter.data.options[0].value == inter.member.id) return inter.createMessage('Why are you even trying?')

        let res = await fetch("https://rra.ram.moe/i/r?type=tickle");
        let json = await res.json();
        let responses = ['How lewd!', 'EW...', 'Awwww cuteeeeeeeee.', 'Get a room you two.', 'Hawt!', 'Why?', 'C-Can I have some?']

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`<@${inter.member.id}> has slapped <@${inter.data.options[0].value}>! ${responses[Math.floor(Math.random() * responses.length)]}`)
          .setImage(`https://rra.ram.moe${json.path}`)
          .setTimestamp()
        inter.createMessage(embed.build());


    }
}
module.exports = Tickle;