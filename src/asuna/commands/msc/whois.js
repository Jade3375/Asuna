const Command = require('../../structures/command');

module.exports = class extends Command {
    constructor (client) {
        super(client, {
            name: "whois",
            description: "information on a user",
            usage: "%whois <user>",
            aliases: []
        });
        this.client = client
    }


    async run(message, args) {
        let user = message.member.guild.members.get(this.getUserFromMention(args[0]))

        if(user == undefined) user = message.member

        if(!user) return message.channel.createMessage("Could not find user")

        let joinedAt = new Date(user.joinedAt).getTime() / 1000
        let Registered = new Date((user.id / 4194304) + 1420070400000).getTime() / 1000
        let roles = [] 
        message.member.roles.forEach(role => { roles.push(`<@&${role.toString()}>`) })

        let embed = new this.Embed()
        .setAuthor(user.user.username, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .addField("Registered", `<t:${Math.floor(Registered)}:R>`, true)
        .addField("Joined At", `<t:${Math.floor(joinedAt)}:R>`, true)
        .addField("Roles", roles.toString().split(",").join(", "))
        //.addField("Permissions", Object.keys(user.permission.json).toString().split(",").join(", "))

        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
    }

}