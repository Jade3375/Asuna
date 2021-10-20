let Command = require('../../structures/command');

class WholesomeFox extends Command {
    constructor (client) {
        super(client, {
            name: "wholesomefox",
            description: "Get a random cute fox pic!",
            usage: "%wholesomefox",
            aliases: ["fox"]
        });
        this.client = client
    }

    async run(message, args) {
        let img = await this.client.weeb.sfw("wholesome_foxes");

        let embed = new this.Embed()
          .setColor("#FF69B4")
          .setDescription(`Here\'s a wholesome fox comic!`)
          .setImage(img)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build());
    }
}
module.exports = WholesomeFox;