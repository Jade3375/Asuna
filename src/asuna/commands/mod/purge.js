const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "purge",
            description: "deletes x amount of messages from the channel",
            usage: "%purge [no.Of Messages]",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let perm = "manageMessages"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)
        if(!message.channel.permissionsOf(this.client.user.id).json[perm]) return message.channel.createMessage(`I do not have the *${perm}* permission in this channel (or server)`)

        if(!args[0]) return message.channel.createMessage("How many messages do I purge again I can\'t undestant   messages")
        
        if(isNaN(parseInt(args[0]))) return message.channel.createMessage(`I can\'t remove ${args[0]} number of messages`)

        message.channel.purge(args[0])
    }

}