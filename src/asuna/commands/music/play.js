let Command = require('../../structures/command');

class Play extends Command {
    constructor (client) {
        super(client, {
            name: "play",
            description: "Play and add songs to the queue",
            usage: "play",
            aliases: ["p"]
        });
        this.client = client
    }

    async run(message, args) {
        let guildID = message.guildID
        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join a voice channel first')

        let searchString = args.join(' '); 
        if (!searchString) return message.channel.createMessage('Hey! You need to search for something to play, baka!') // pretty clear whats happening here

        if(!this.client.musicManager.player.CheckPlayer(guildID)) this.client.musicManager.player.CreatePlayer(guildID) // checks if the guild already has a player, makes one if false

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) this.client.musicManager.player.Connectplayer(guildID, channel) // checks if player is connected, connects if false

        let search = await this.client.musicManager.player.searchSong(guildID, searchString) // searches for song
        if(search == 'SongExistsInQueue') return message.channel.createMessage('Song already in queue') // lets user know if song is in queue
        if(search == 'NoSong') return message.channel.createMessage(`Couldn\'t find ${searchString} on youtube`) // if song could not be found, let the user know

        //if(!this.client.musicManager.player.IsPlaying(guildID) && search.) return this.play(search, message)
        
        if(!this.client.musicManager.player.IsPlaying(guildID)) return this.play(search, message, guildID)

        let embed = new this.Embed()
        .setDescription(`[${search.info.title}](${search.info.uri}) has been added to the queue`)
        .setFooter("Music will be moving to soundcloud soon")
        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())

        this.client.getChannel("684703815009828884").createMessage(`${search.info.title} has been added to there queue in ${message.guildID}`)
        
    }

    async play(search, message, guildID) {
        this.client.musicManager.player.PlayTrack(guildID, message.channel.id)// if the player isn't playing start playing
        let embed = new this.Embed()
        .addField('Now Playing', `[${search.info.title}](${search.info.uri})`)
        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
        this.client.getChannel("684703815009828884").createMessage(`${search.info.title} has been added to there queue in ${message.guildID}`)
    }

}

module.exports = Play;