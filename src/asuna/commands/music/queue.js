let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "queue",
            description: "Get the current queue",
            usage: "queue",
            aliases: ["q"]
        });
        this.client = client
    }

    async run(message, args, client) {
        let guildID = message.guildID

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return message.channel.createMessage('This guild does not have a music player assigned to it'); // checks if the guild already has a player

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) return message.channel.createMessage('Queue is empty') // check if player is connected

        let pageSize = 10
        let page
        let total_pages = Math.ceil(player.queueManager.queue.length / pageSize);

        if (!args[0]) {
            page = 1;
        } else {
            if(args[0].match(/[A-Z]/gi)) {
                return message.channel.createMessage("Page number must be a number");
            }
            page = parseInt(args[0]);
            if (page <= 0 || page > total_pages) {
                message.channel.createMessage("There is nothing here");
                return;
            }
            
        }

        let songs = []
        let time = 0
        let counter = 0;
        let counter_offset = (page - 1) * pageSize;

        player.queueManager.queue.forEach(function (s = JSON) {
            time += parseInt(s.info.length)
        })

        player.queueManager.queue.forEach(function (s = JSON) {
            counter++;
            if (counter < counter_offset || counter > page * pageSize) {
                return;
            }
            songs.push(`#${counter}: ${s.info.title}`);
        })
        let embed = new this.Embed()
        .addField(`Queue`, songs.join('\n'))
        .setFooter(`page ${page} / ${total_pages}    queue estemate: ${Math.round((time / 1000) / 60)} minutes`)
        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
        

    }
}