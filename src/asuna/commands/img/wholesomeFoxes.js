let Command = require('../../structures/command');

class WholesomeFox extends Command {
    constructor (client) {
        super(client, {
            name: "wholesomefox",
            description: "wholesome foxes for all",
            usage: "%wholesomefox",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {

        let img = await this.client.weeb.sfw("wholesome_foxes");
        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`Here\'s a wholesome fox comic.`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}

module.exports = WholesomeFox;
