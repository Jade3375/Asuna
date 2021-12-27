const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "unban",
            description: "Unbans a user from the guild.",
            usage: "%unban [@USER or USERID]",
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

    async slash(inter, data) {
        let perm = "banMembers"
        let usr = data.options[0].value
        let gObj = inter.channel.guild
        let userID = inter.member.id
        let targetName = gObj.members.get(userID).username
        

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        if(!this.checkPermInter(this.client.user.id,gObj, perm)) return inter.createMessage(`I do not have the *${perm}* permission.`) //Bot perm check

        this.client.unbanGuildMember(inter.guildID, usr).catch(err => {
            inter.createMessage("I cannot unban this member!")
        })

        let embed = new this.Embed()
          .setColor("#20FF20")
          .setTitle("User Unbanned")
          .setDescription(`User ${targetName} successfully unbanned.`)
          .setTimestamp()

        inter.createMessage(embed.build())
    }
}