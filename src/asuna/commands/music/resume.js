let Command = require('../../structures/command');

class Play extends Command {
    constructor(client) {
        super(client, {
            name: "resume",
            description: "resume playback",
            usage: "%resume",
            aliases: []
        });
        this.client = client
    }

    async run(message, args, client) {
        let guildID = message.guildID

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return message.channel.createMessage('This guild does not have a music player assigned to it'); // checks if the guild already has a player

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) return message.channel.createMessage('I am not connected to any voice channel') // check if player is connected

        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join the voice channel first')

        if(channel != player.channel) return message.channel.createMessage('resume if you are not in the same channel as me');

        if(!player.paused) return message.channel.createMessage('Player is already playing')

        player.resume()
        message.channel.createMessage('resumed the player')

    }
}
module.exports = Play; 