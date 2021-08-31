let Command = require('../../structures/command');

class Stop extends Command {
    constructor (client) {
        super(client, {
            name: "stop",
            description: "Stops the song and clears the queue",
            usage: "stop",
            aliases: ["fuckoff", "stop"]
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

        if(channel != player.channel) return message.channel.createMessage('I cannot leave a channel you are not in');

        this.client.musicManager.player.DisconnectPlayer(guildID); //disconnects player ending playback and clearing queue

        message.channel.createMessage('Left the channel, Bye!! Bye!!')
    }
}
module.exports = Stop; 