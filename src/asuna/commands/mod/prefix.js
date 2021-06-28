const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "prefix",
            description: "changes the prefix for the server",
            usage: "%prefix <newPrefix | reset>",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)
        
        let newPrefix = args[0]

        if(!args[0]) return message.channel.createMessage(`Usage: %prefix <newPrefix | reset>`)

        if(newPrefix == "reset") newPrefix = "%"

        this.client.pf.changePrefix(message.guildID, newPrefix)
        
        message.channel.createMessage(`Prefix has been set to ${newPrefix}`)
    }

}