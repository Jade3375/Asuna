let Command = require('../../structures/command');

class Skip extends Command {
    constructor(client) {
        super(client, {
            name: "skip",
            description: "skip current playing track",
            usage: "skip",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let guildID = message.guildID
        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join a voice channel first')

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return message.channel.createMessage("No songs playing")

        if(!this.client.musicManager.player.IsConnected(guildID)) return message.channel.createMessage("No songs playing")

        let player = this.client.musicManager.player.getPlayer(guildID)

        channel = this.client.getChannel(message.member.voiceState.channelID) 

        if((channel.voiceMembers.size - 1) / 2 <= player.skips) {
            player.stop()
            message.channel.createMessage("skipping song")
            player.skips = 0
            return
        }

        if(player.skippers.get(message.author.id)) return message.channel.createMessage("You already voted")

        player.skippers.set(message.author.id, true)

        player.skips = player.skips + 1


        if((channel.voiceMembers.size - 1) / 2 <= player.skips) {
            player.stop()
            message.channel.createMessage("skipping song")
            player.skips = 0
            return
        }
        message.channel.createMessage(`${player.skips} skips out of ${Math.round((channel.voiceMembers.size - 1) / 2)} skips`)

    }

    async slash(inter){

        let guildID = inter.guildID
        let channel = inter.member.voiceState.channelID // check if user is in a vc
        if(!channel) return inter.createMessage('You might want to join a voice channel first!')

        if(!this.client.musicManager.player.CheckPlayer(guildID)) return inter.createMessage("No songs playing!")

        if(!this.client.musicManager.player.IsConnected(guildID)) return inter.createMessage("No songs playing!")

        let player = this.client.musicManager.player.getPlayer(guildID)

        //after checking if user is in a vc, channel object is grabbed into old variable
        channel = this.client.getChannel(inter.member.voiceState.channelID) 

        if((channel.voiceMembers.size - 1) / 2 <= player.skips) {
            player.stop()
            inter.createMessage(":cd: Skipping Song...")
            player.skips = 0
            return
        }

        if(player.skippers.get(inter.member.id)) return inter.createMessage("You already voted")

        player.skippers.set(inter.member.id, true)

        player.skips = player.skips + 1


        if((channel.voiceMembers.size - 1) / 2 <= player.skips) {
            player.stop()
            inter.createMessage(":cd: Skipping Song...")
            player.skips = 0
            return
        }
        inter.createMessage(`${player.skips} skips out of ${Math.round((channel.voiceMembers.size - 1) / 2)} skips`)


    }
}
module.exports = Skip;