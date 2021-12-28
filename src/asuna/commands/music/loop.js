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

    async slash(inter, data) {
        let guildID = inter.guildID
        let arg = data.options[0].value

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return inter.createMessage('This guild does not have a music player assigned to it'); // checks if the guild already has a player

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!this.client.musicManager.player.IsConnected(guildID)) return inter.createMessage('I am not connected to any voice channel') // check if player is connected

        let channel = inter.member.voiceState.channelID // check if user is in a vc
        if(!channel) return inter.createMessage('You might want to join the voice channel first')

        if(channel != player.channel) return inter.createMessage('I cannot change loop settings if you are not in the same channel as me');
        
        switch(arg) {
            case "all":
                type = 3
                break
            case "single":
                type = 2
                break
            case "off":
                type = 1
                break
            default:
                return await inter.createMessage("Error when processing Loop command.")
        }
        player.queueManager.SetPlayType(type)
        inter.createMessage(`:small_blue_diamond: Loop set to: **${arg}**`)


    }
}
module.exports = Loop;