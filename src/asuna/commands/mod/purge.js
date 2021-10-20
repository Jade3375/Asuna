const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "purge",
            description: "Deletes x amount of messages from the channel.",
            usage: "%purge [# OF MESSAGES]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let perm = "manageMessages"

        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission.`) //User perm check
        
        if(!message.channel.permissionsOf(this.client.user.id).json[perm]) return message.channel.createMessage(`I do not have the *${perm}* permission in this channel (or server).`) //Bot perm check

        if(!args[0]) return message.channel.createMessage("How many messages do I purge again? I can\'t undestant messages!")
        
        if(isNaN(parseInt(args[0]))) return message.channel.createMessage(`I can\'t remove ${args[0]} number of messages!`)

        message.channel.purge({limit: parseInt(args[0]), reason: `${args[0]} messages purged by ${message.author.username}.`})
    }

}