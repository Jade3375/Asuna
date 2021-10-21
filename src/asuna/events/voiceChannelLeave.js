module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (member, channel) {
        let stop = false
        channel.voiceMembers.forEach(user => {
            if(!user.bot == true) stop = true
        });

        let guildID = channel.guild.id
        let player = this.client.musicManager.player.getPlayer(guildID)
        
        if(member.id == this.client.user.id) return this.client.musicManager.player.DisconnectPlayer(guildID);
        
        if(stop) return

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return
        
        if(!player._connected) return
        
        if(channel.id != player.channel) return

        this.client.musicManager.player.DisconnectPlayer(guildID); //disconnects player ending playback and clearing queue
    }
}