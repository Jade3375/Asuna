let Command = require('../../structures/command');
let type = null

class Loop extends Command {
    constructor (client) {
        super(client, {
            name: "loop",
            description: "Loop current song or the queue",
            usage: "loop [all/one]",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        let guildID = message.guildID

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return message.channel.createMessage('This guild does not have a music player assigned to it'); // checks if the guild already has a player

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!this.client.musicManager.player.IsConnected(guildID)) return message.channel.createMessage('I am not connected to any voice channel') // check if player is connected

        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join the voice channel first')

        if(channel != player.channel) return message.channel.createMessage('I cannot change loop settings if you are not in the same channel as me');

        if(args[0] == "all") type = 3
        else if(args[0] == "single") type = 2
        else if(args[0] == "off") type = 1
        else {
            let embed = new this.Embed()
            .setDescription(`Invalid Usage: %loop <all|single|off>`)
            this.client.globalEmbedData(embed)

            return message.channel.createMessage(embed.build())
        }

        player.queueManager.SetPlayType(type)
        message.channel.createMessage(`loop set to: ${args[0]}`)
    }
}
module.exports = Loop;