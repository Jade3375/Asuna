const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "prefix",
            description: "Changes the prefix for the guild.",
            usage: "%prefix <[NEW PREFIX] OR [RESET]>",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let perm = "manageGuild"
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission.`) //User perm check
        
        let newPrefix = args[0]

        if(!args[0]) return message.channel.createMessage(`Usage: %prefix <[NEW PREFIX] OR [RESET]>`)

        if(newPrefix.toLowerCase() == "reset") newPrefix = "%"

        this.client.pf.changePrefix(message.guildID, newPrefix)
        
        message.channel.createMessage(`Prefix has been set to "${newPrefix}".`)
    }
}