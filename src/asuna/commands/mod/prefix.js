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
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let newPrefix = args[0]

        if(!args[0]) return message.channel.createMessage(`Usage: %prefix <[NEW PREFIX] OR [RESET]>`)

        if(newPrefix.toLowerCase() == "reset") newPrefix = "%"

        this.client.pf.changePrefix(message.guildID, newPrefix)
        
        message.channel.createMessage(`Prefix has been set to "${newPrefix}".`)
    }

    async slash(inter, data) {
        let perm = "manageGuild"
        let gObj = inter.channel.guild
        let userID = inter.member.id
        let arg = data.options[0].value

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        let newPrefix = arg

        if(newPrefix.toLowerCase() == "reset") newPrefix = "%"

        this.client.pf.changePrefix(inter.guildID, newPrefix)
        
        inter.createMessage(`Prefix has been set to "${newPrefix}".`)


    }
}