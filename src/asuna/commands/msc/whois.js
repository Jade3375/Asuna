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

        if(!user || user == undefined) return message.channel.createMessage("Could not find user")

        let joinedAt = new Date(user.joinedAt).toString().split("GMT")[0]
        let Registered = new Date((user.id / 4194304) + 1420070400000).toString().split("GMT")[0]
        let roles = [] 
        message.member.roles.forEach(r => { roles.push(`<@&${r.toString()}>`) })

        let embed = new this.Embed()
        .setAuthor(user.user.username, user.avatarURL)
        .setThumbnail(user.avatarURL)
        .addField("Registered", `${Registered}`, true)
        .addField("Joined At", `${joinedAt}`, true)
        .addField("Roles", roles.toString().split(",").join(", "))
        //.addField("Permissions", Object.keys(user.permission.json).toString().split(",").join(", "))

        this.client.globalEmbedData(embed)

        message.channel.createMessage(embed.build())
    }

}