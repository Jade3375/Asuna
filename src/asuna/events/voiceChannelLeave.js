module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (member, channel) {
        let stop = false
        channel.voiceMembers.forEach(user => {
            if(!user.bot == true) stop = true
        });

        if(stop) return

        let guildID = channel.guild.id
        if(!this.client.musicManager.player.CheckPlayer(guildID)) return
        let player = this.client.musicManager.player.getPlayer(guildID)
        if(!player._connected) return
        if(channel.id != player.channel) return

        this.client.musicManager.player.DisconnectPlayer(guildID); //disconnects player ending playback and clearing queue
    }
}