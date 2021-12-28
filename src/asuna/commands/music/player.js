let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "player",
            description: "shows player status",
            usage: "%player",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let channel

        let player = this.client.musicManager.player.getPlayer(message.guildID)
        if(!player) return message.channel.createMessage("This guild has no player")

        if(player.channel === null) channel = "no channel"
        else channel = `<#${player.channel}>`

        let embed = new this.Embed()
        .setTitle("Player Status")
        .setDescription(`Guild: ${message.member.guild.name} \nChannel: ${channel} \nVolume: ${player.volume} \nPaused: ${player.paused} \nPlaying: ${player.playing} \nMusic node: ${player.socket.id}`)
        this.client.globalEmbedData(embed)
        message.channel.createMessage(embed.build())

    }

    async slash(inter){

        let channel

        let player = this.client.musicManager.player.getPlayer(inter.guildID)
        if(!player) return inter.createMessage("This guild has no player")

        if(player.channel === null) channel = "no channel"
        else channel = `<#${player.channel}>`

        let embed = new this.Embed()
        .setTitle("Player Status")
        .setDescription(`Guild: ${inter.member.guild.name} \nChannel: ${channel} \nVolume: ${player.volume} \nPaused: ${player.paused} \nPlaying: ${player.playing} \nMusic node: ${player.socket.id}`)
        this.client.globalEmbedData(embed)
        inter.createMessage(embed.build())

    }
}