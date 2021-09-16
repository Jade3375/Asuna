const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "kick",
            description: "Kicks a user from the guild.",
            usage: "%kick [user]",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let perm = "kickMembers"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)
        if(!this.checkPerm(this.client.user.id, message, perm)) return message.channel.createMessage(`I do not have the *${perm}* permission`)
        
        let usr = this.getUserFromMention(args[0]) 
        if(!usr) return message.channel.createMessage(`Who should I kick? The air?`)

        //perm check for person being kicked
        if(this.checkPerm(usr, message, perm)) return message.channel.createMessage(`This user is too high a level for me to kick`)
        args.shift()

        this.client.kickGuildMember(message.guildID, usr, args.join(" ")).catch(err => {
            message.channel.createMessage("I cannot kick this member, is my role high enough?")
        })
    }

}