const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "stats",
            description: "shows bot stats",
            usage: "%stats",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let stats = await this.client.ipc.getStats()

        let totalSeconds = (process.uptime()); 
        let days = Math.floor(totalSeconds / 86400)
        let hours = Math.floor(totalSeconds / 3600) - (days * 24);
        totalSeconds %= 3600; 
        let minutes = Math.floor(totalSeconds / 60); 
        
        let embed = new this.Embed()
        .setTitle("Bot Stats")
        .addField("Discord Stats", `Guilds: ${stats.guilds} \nMusic Players: ${this.client.musicManager.player.lavaLink.manager.players.size}`)
        .addField("Host Stats", `Master Ram: ${Math.round(stats.masterRam)} MB \nBot Ram ${Math.round(stats.totalRam) - Math.round(stats.masterRam)} MB \nTotal Ram: ${Math.round(stats.totalRam)} MB \nUptime: ${days} days: ${hours} hours: ${minutes} minutes`)
        this.client.globalEmbedData(embed)
        
        message.channel.createMessage(embed.build())

    }

}