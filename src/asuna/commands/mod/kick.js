const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "kick",
            description: "Kicks a user from the guild.",
            usage: "%kick [@USER or USERID]",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let perm = "kickMembers"
        
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission.`) //User perm check
        
        if(!this.checkPerm(this.client.user.id, message, perm)) return message.channel.createMessage(`I do not have the *${perm}* permission.`) //Bot perm check
        
        let usr = this.getUserFromMention(args[0]) 
        
        if(!usr) return message.channel.createMessage(`Who should I kick? The air?`)

        if(this.checkPerm(usr, message, perm)) return message.channel.createMessage(`This user is too high a level for me to kick!`) //Target perm check
        
        args.shift()

        this.client.kickGuildMember(message.guildID, usr, args.join(" ")).catch(err => {
            message.channel.createMessage("I cannot kick this member! Is my role high enough?")
        })
    }

}