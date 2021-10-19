const { ResumeToken } = require('mongodb');

/**
 * @class Player 
 * @param manager The lavalink manager
 * @param client the bot client
 * @classdesc Main class used to control the music player
 */
class Player {
    constructor(manager, client) {
        this.lavaLink = manager
        this.Queue = require('./queueManager');
        this.client = client
    }

    // queue can only  be accessed by player so this just calls the search function in the queue class
    async searchSong(guildID, song){
        return await this.getPlayer(guildID).queueManager.searchSong(this.lavaLink, song)
    }
    //checks if the player is playing
    IsPlaying(guildID) {
        return this.lavaLink.manager.players.get(guildID).playing
    }
    //checks if player is connected 
    IsConnected(guildID) {
        if(!this.lavaLink.manager.players.get(guildID).channel) return false
        return true
    }

    //checks to see if the player does exist
    CheckPlayer(guildID) {
        if(!this.lavaLink.manager.players.get(guildID)) return false
        return true
    }

    //creates the player for a guild
    CreatePlayer(guildID) {
        if(this.lavaLink.manager.players.get(guildID) != null) return
        try {
            this.lavaLink.manager.create(guildID).then(this.lavaLink.manager.players.get(guildID).queueManager = new this.Queue(guildID))
            this.lavaLink.manager.players.get(guildID).setVolume(50)
            this.lavaLink.manager.players.get(guildID).skips = 0
            this.lavaLink.manager.players.get(guildID).skippers = new Map()
            this.lavaLink.manager.players.get(guildID).msg = null
            return "player Created"
        } catch (error) {
            return `player not created due to error ${error}`
        }
    }
    //returns the player, mostly used for debugging 
    getPlayer(guildID) {
        return this.lavaLink.manager.players.get(guildID)
    }

    //connects player to a channel
    async Connectplayer(guildID, channelID) {
        if(this.lavaLink.manager.players.get(guildID)) {
            this.lavaLink.manager.players.get(guildID).connect(channelID) //deafens the bot  on channel join cuz people be scared 
        }
    }

    //disconnects player and removes it from bot
    DestroyPlayer(guildID) {
        if (this.lavaLink.manager.players.get(guildID)) {
            this.lavaLink.manager.players.destroyPlayer(guildID)
            //this.lavaLink.manager.players.get(guildID).destroy()
            //this.lavaLink.manager.players.delete(guildID)
        }
    }

    //disconnects player from a channel
    DisconnectPlayer(guildID, message) {
        let player = this.lavaLink.manager.players.get(guildID)
        if(player) {
            player.stop()
            player.queueManager.clearQueue()
            player._connected = false
            player.disconnect(true)
            return message
        }
    }

    //plays tracks
    async PlayTrack(guildID, channelID) {
        let player = this.lavaLink.manager.players.get(guildID)
        try {
            if(!player) return "NoPlayer"
            player.skips = 0
            player.skippers = new Map()
            let song = await player.queueManager.getSong()
            if(!song || song == undefined) return
            player.play(song)
        } catch (error) {
           player.queueManager.NextSong()
           if(player.queueManager.queue == null) {
               player.DestroyPlayer(guildID)
               this.client.getChannel(channelID).createMessage("something broke with the song, oopsie")
               return
           } else {
            this.client.getChannel(channelID).createMessage("An error occured while trying to play this song, skipping.....")
            this.PlayTrack(guildID, channelID)
            console.error("music error")
           }
        }

        player.once("end", async () => {
            await player.queueManager.NextSong()
            if(player.queueManager.queue == (null || undefined) ) {
                let embed = new this.client.Embed()
                .setDescription(`playback has ended, thanks for listening :heart:`)
                this.client.globalEmbedData(embed)

                let c = this.client.getChannel(channelID)
                c.unsendMessage(this.lavaLink.manager.players.get(guildID).msg).catch(e => {
                    console.log(e)
                })
                c.createMessage(embed.build()).catch(e => {
                    console.log(e)
                })
                this.DisconnectPlayer(guildID, "END")
                return
            }
            else { 
                this.PlayTrack(guildID, channelID)
                let song = await player.queueManager.getSong()
                let embed = new this.client.Embed()
                .addField('Now Playing', `[${song.info.title}](${song.info.uri})`)
                this.client.globalEmbedData(embed)

                let c = this.client.getChannel(channelID)
                c.unsendMessage(this.lavaLink.manager.players.get(guildID).msg).catch(e => {
                    console.log(e)
                })
                c.createMessage(embed.build()).then(m => {
                    this.lavaLink.manager.players.get(guildID).msg = m.id
                }).catch(e => {
                    console.log(e)
                })
            }
        })
    }

}

module.exports = Player