let Command = require('../../structures/command');

class Stop extends Command {
    constructor(client) {
        super(client, {
            name: "join",
            description: "Join the voice channel",
            usage: "join",
            aliases: ["j"]
        });
        this.client = client
    }

    async run(message, args) {
        let guildID = message.guildID
        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join a voice channel first')

        if(!this.client.musicManager.player.CheckPlayer(guildID)) this.client.musicManager.player.CreatePlayer(guildID) // checks if the guild already has a player, makes one if false
        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) return this.client.musicManager.player.Connectplayer(guildID, channel) // checks if player is connected, connects if false

        message.channel.createMessage('Im already in a voice channel')

    }

    async slash(inter) {
        let guildID = inter.guildID
        let channel = inter.member.voiceState.channelID // check if user is in a vc
        if(!channel) return inter.createMessage('You might want to join a voice channel first!')

        if(!this.client.musicManager.player.CheckPlayer(guildID)) this.client.musicManager.player.CreatePlayer(guildID) // checks if the guild already has a player, makes one if false
        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) {
            inter.createMessage(":small_blue_diamond: **Connected!**")   
            return this.client.musicManager.player.Connectplayer(guildID, channel) // checks if player is connected, connects if false
        }

        inter.createMessage('I\'m already in a voice channel')
    }
}
module.exports = Stop;