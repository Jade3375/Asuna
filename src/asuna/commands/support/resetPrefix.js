let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "resetprefix",
            description: "resets prefix",
            usage: "resetprefix {guildID}",
            aliases: []
        });
        this.client = client
    }

    async run(message, args,) {
        if(message.author.id != "165811958828761089" || message.author.id != "268843733317976066" || message.author.id != "181072300815286275")

        if(!args[0]) return message.channel.createMessage("no guild id provided")
        this.client.db.editRow("server", args[0], {prefix: "%"})
        this.client.pf.prefixes.delete(args[0])

        message.channel.createMessage(`the guilds prefix has been reset`)

    }

    async slash(inter){
        let GUID = inter.data.options[0].value
        let owners = ["165811958828761089", "181072300815286275", "431743926974808076"];
        if (!owners.includes(inter.member.id)) return inter.createMessage("Developer-only Command.");
        if(GUID) return message.channel.createMessage("no guild id provided")

        let row = await this.client.db.getRow("server", GUID)
        if(row.data == null) return inter.createMessage("No guild found")

        this.client.db.editRow("server", GUID, {prefix: "%"})
        this.client.pf.prefixes.delete(GUID)

        inter.createMessage(`The guilds prefix has been reset`)
    }
}
