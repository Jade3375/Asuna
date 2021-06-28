let Command = require('../../structures/command');
let progressBar = [
    "🔘━━━━━━━━━",
    "━🔘━━━━━━━━",
    "━━🔘━━━━━━━",
    "━━━🔘━━━━━━",
    "━━━━🔘━━━━━",
    "━━━━━🔘━━━━",
    "━━━━━━🔘━━━",
    "━━━━━━━🔘━━",
    "━━━━━━━━🔘━",
    "━━━━━━━━━🔘",
]

class NowPlaying extends Command {
    constructor (client) {
        super(client, {
            name: "nowplaying",
            description: "Display the current song.",
            usage: "nowplaying",
            aliases: ["np"]
        });
        this.client = client
    }

    async run(message, args) {
        let guildID = message.guildID
        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player.playing) return message.channel.createMessage('No song are currently playing')

        let search = player.queueManager.getSong()

        let totalSeconds = (player.position / 1000);
        let totalLenght = totalSeconds  
        totalSeconds %= 3600; 
        let minutes = Math.floor(totalSeconds / 60); 
        let seconds = Math.round(totalSeconds % 60);

        let totalSeconds2 = (search.info.length / 1000);
        let elapsed = Math.round(totalSeconds2) 
        totalSeconds2 %= 3600; 
        let minutes2 = Math.floor(totalSeconds2 / 60); 
        let seconds2 = Math.round(totalSeconds2 % 60);

        let i = totalLenght / elapsed 

        if(seconds2 < 10) seconds2 = `0${seconds2}`
        if(seconds < 10) seconds = `0${seconds}`

        let embed = new this.Embed()
        .setDescription(`[${search.info.title}](${search.info.uri}) is currently playing\n${progressBar[i.toFixed(1)[2]]} \n${minutes}:${seconds}/${minutes2}:${seconds2}`)
        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
    }
}
module.exports = NowPlaying;