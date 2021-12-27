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

    async slash(inter, data) {
        let perm = "kickMembers"
        let usr = data.options[0].value
        let reason = "No reason provided." //Default value because discord doesn't return the 2nd optional option for interactions if left blank.
        let gObj = inter.channel.guild
        let userID = inter.member.id
        let targetName = gObj.members.get(userID).username

        if(data.options[1] != undefined) reason = data.options[1].value
        

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        if(!this.checkPermInter(this.client.user.id,gObj, perm)) return inter.createMessage(`I do not have the *${perm}* permission.`) //Bot perm check

        if(this.checkPermInter(usr, gObj,perm)) return inter.createMessage(`This user is too high a level for me to ban!`) //Target perm check
        
        
        this.client.kickGuildMember(inter.guildID, usr, reason).catch(err => {
            inter.createMessage("I cannot kick this member! Is my role high enough?")
        })

        let embed = new this.Embed()
          .setColor("#7ABB20")
          .setTitle("User Kicked")
          .setDescription(`User ${targetName} successfully kicked.`)
          .addField(`Reason: `, reason)
          .setTimestamp()

        inter.createMessage(embed.build())
    }
}

