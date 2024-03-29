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

        let guildData = await this.client.db.getRow("server", guildID)

        let searchString = args.join(' '); 
        if (!searchString) return message.channel.createMessage('Hey! You need to search for something to play, baka!') // pretty clear whats happening here

        if(!this.client.musicManager.player.CheckPlayer(guildID)) this.client.musicManager.player.CreatePlayer(guildID) // checks if the guild already has a player, makes one if false

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) this.client.musicManager.player.Connectplayer(guildID, channel) // checks if player is connected, connects if false

        let search = await this.client.musicManager.player.searchSong(guildID, searchString, guildData.data.yts) // searches for song
        if(search == 'SongExistsInQueue') return message.channel.createMessage('Song already in queue') // lets user know if song is in queue
        if(search == 'NoSong') return message.channel.createMessage(`Couldn\'t find ${searchString} on youtube`) // if song could not be found, let the user know

        //if(!this.client.musicManager.player.IsPlaying(guildID) && search.) return this.play(search, message)
        
        if(search == "novid") return message.channel.createMessage("No song with this title was found.")
        
        if(!this.client.musicManager.player.IsPlaying(guildID)) return this.play(search, message, guildID)

        let embed = new this.Embed()
        .setDescription(`[${search.info.title}](${search.info.uri}) has been added to the queue`)
        .setFooter("Song Search by soundcloud")
        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
        
    }

    async play(search, message, guildID, isInteraction) {
        try {

            let channelID
            let channelObj
            if(isInteraction) {
                channelObj = isInteraction
                channelID = isInteraction.channel.id
            } else {
                channelObj = message.channel
                channelID = message.channel.id
            }
            this.client.musicManager.player.PlayTrack(guildID, channelID)
            let embed = new this.Embed()
            .addField('Now Playing', `[${search.info.title}](${search.info.uri})`)
            this.client.globalEmbedData(embed)
            
            if(isInteraction) {
                await channelObj.acknowledge()
                channelObj.createFollowup(embed.build()).then(m => {
                    this.client.lavalink.manager.players.get(guildID).msg = m.id
                })
            } else {
                channelObj.createMessage(embed.build()).then(m => {
                    this.client.lavalink.manager.players.get(guildID).msg = m.id
                })
            }
        } catch (error) {
            console.log(error)
            channelObj.createMessage("an error occured trying to play / get track info")
            
        }
    }

    async slash(inter, data) {
        let guildID = inter.guildID
        let channel = inter.member.voiceState.channelID // check if user is in a vc
        if(!channel) return inter.createMessage('You might want to join a voice channel first')

        let guildData = await this.client.db.getRow("server", guildID)

        let searchString = data.options[0].value
        
        if(!this.client.musicManager.player.CheckPlayer(guildID)) this.client.musicManager.player.CreatePlayer(guildID) // checks if the guild already has a player, makes one if false

        let player = this.client.musicManager.player.getPlayer(guildID)

        if(!player._connected) this.client.musicManager.player.Connectplayer(guildID, channel) // checks if player is connected, connects if false

        let search = await this.client.musicManager.player.searchSong(guildID, searchString, guildData.data.yts) // searches for song
        if(search == 'SongExistsInQueue') return inter.createMessage('Song already in queue') // lets user know if song is in queue
        if(search == 'NoSong') return inter.createMessage(`Couldn\'t find ${searchString} on YouTube`) // if song could not be found, let the user know

        //if(!this.client.musicManager.player.IsPlaying(guildID) && search.) return this.play(search, message)
        
        if(search == "novid") return inter.createMessage("No song with this title was found.")
        
        if(!this.client.musicManager.player.IsPlaying(guildID)) return this.play(search, inter.message, guildID, inter)

        let embed = new this.Embed()
        .setDescription(`[${search.info.title}](${search.info.uri}) has been added to the queue`)
        .setFooter("Song Search by soundcloud")
        this.client.globalEmbedData(embed)

        inter.createMessage(embed.build())
    }

}

module.exports = Play;