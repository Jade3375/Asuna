const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "unban",
            description: "Unbans a user from the guild.",
            usage: "%unban [userID]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let perm = "banMembers"
        
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission.`) //User perm check
       
        if(!this.checkPerm(this.client.user.id, message, perm)) return message.channel.createMessage(`I do not have the *${perm}* permission.`) //Ban perm check
        
        let usr = args[0] 
        
        if(!usr) return message.channel.createMessage(`Who should I unban? The air?`)

        args.shift()

        await this.client.unbanGuildMember(message.guildID, usr, args.join(" ")).catch(err => {
            message.channel.createMessage("I could not unban this user for an unknown reason.").then(console.error(err))
            return
        })
        
        message.channel.createMessage(`${usr} has been unbanned.`)
    }
}