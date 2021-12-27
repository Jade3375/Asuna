let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "volume",
            description: "set player volume",
            usage: "volume",
            aliases: ["v"]
        });
        this.client = client
    }

    async run(message, args) {
        let player = this.client.musicManager.player.getPlayer(message.member.guild.id)
        if(!player) return message.channel.createMessage("no player to change the volume of")

        let channel = message.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join a voice channel first')

        if(channel != player.channel) return message.channel.createMessage('I cannot allow you to change volume if you are not here');

        if(!args[0]) return message.channel.createMessage("please enter a Number between 1 and 200")

        if(isNaN(parseInt(args[0]))) return message.channel.createMessage("please enter a Number between 1 and 200")

        if(args[1] == "override") {
            if(parseInt(args[0]) > 1000 || parseInt(args[0]) < 1) return message.channel.createMessage("override limit is 1000")
            player.setVolume(parseInt(args[0]))
            message.channel.createMessage(`overriding player volume to ${args[0]}`)
        }
        if(args[1] == "override") return

        if(parseInt(args[0]) > 200 || parseInt(args[0]) < 1) return message.channel.createMessage("please enter a number Between 1 and 200")

        player.setVolume(parseInt(args[0]))
        message.channel.createMessage(`set player volume to ${args[0]}`)
    }

    async slash(inter, data){

        let player = this.client.musicManager.player.getPlayer(inter.guildID)
        if(!player) return message.channel.createMessage("No player to change the volume of!")

        let channel = inter.member.voiceState.channelID // check if user is in a vc
        if(!channel) return message.channel.createMessage('You might want to join a voice channel first!')

        if(channel != player.channel) return message.channel.createMessage('I cannot allow you to change volume if you are not in my VC!');

        if(data.options[1] != undefined) {
            if(data.options[0].value > 1000) return inter.createMessage("Override limit is 1000")
            player.setVolume(data.options[0].value)
            inter.createMessage(`overriding player volume to ${data.options[0].value}`)
        }
        if(data.options[1]) return

        if(data.options[0].value > 200) return inter.createMessage("Please enter a number Between 1 and 200")

        player.setVolume(data.options[0].value)
        inter.createMessage(`set player volume to ${data.options[0].value}`)

    }
}