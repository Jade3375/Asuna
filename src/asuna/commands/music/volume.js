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

        if(parseInt(args[0]) == NaN || parseInt(args[0]) == undefined) return message.channel.createMessage("please enter a Number between 1 and 200")

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
}