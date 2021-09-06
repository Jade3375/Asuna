const shuffle = require('shuffle-array')

class queueManager {
    /**
     * 
     * @param {String} guild The ID of the guild the playlist belongs to
     * 
     * @queue an array of tracks to be played
     * @playType int value determining how to play the playlist, 1 = normal, 2 = loop, 3 = loop all  
     */
    constructor(guild, player) {
        this.guild = guild;
        this.queue  = [];
        this.playType = 1;
    }
    //sets type of queue
    SetPlayType(type) {
        if(type == 1 || type == 2 || type == 3) {
            this.playType = type
            return type
        }
    }

    //3 = loop all, 2 = loop single, 1 = normal play
    NextSong() {
        if(this.playType == 3) {
            this.queue.push(this.queue.shift())
        }
        else if(this.playType == 2) {

        }
        else {
            if(this.queue == null) return
            this.queue.shift()
            if(this.queue[0] == (null || undefined)) this.queue = null
        }
    }
    //removes certen song from queue
    removeFromQueue(song) {

    }

    //imported shuffle-array cuz im lazy
    shuffle() {
        let array = this.queue
        shuffle(array)
        this.queue = array
        return "OK"
    }
    //will be used to load usrer playlists (currently not implomented)
    loadPlaylist(playlist) {
        if(typeof playlist != Array) {
            console.error(`playlist argument is not typeof array`)
            return "Not A Playlist"
        }
        this.queue = playlist
        return "OK"
    }
    //clears the queue
    clearQueue() {
        this.queue = null
        this.playType = 1
        return "Cleared"
    }
    //returns queue
    getQueue() {
        return this.queue;
    }

    //searches the song on yt and gets first result (used for queue)
    async searchSong(lavaLink, song) {
        let ytreg = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
        let twreg = /^(?:https?:\/\/)?(?:www\.|go\.)?twitch\.tv\/([A-z0-9_]+)($|\?)/gm
        let searchType = "scsearch:"
        let res

        if(ytreg.test(song)) res = song
        else res = `${searchType} ${song}`
        if(twreg.test(song)) res = song
        else res = `${searchType} ${song}`

        console.log(res)

        let search = await lavaLink.manager.search(res)
        if(search.loadType == "PLAYLIST_LOADED") {
            search.forEach(element => {
                this.queue.push(element)
            });
            return(search[0])
        }
        let vid = search.tracks[0]
        if(vid == (undefined || null)) return "novid"
        if(this.queue == null) this.queue = []
        this.queue.push(vid)
        return(vid)
    }

    getSong() {
        return this.queue[0] || null
    }

}

module.exports = queueManager