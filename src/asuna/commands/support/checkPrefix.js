let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "checkprefix",
            description: "relaods all commands",
            usage: "checkprefix",
            aliases: []
        });
        this.client = client
    }

    async run(message, args,) {
        let row = await this.client.db.getRow("staff", message.member.id)
        if(row.data == null) return

        if(!args[0]) return message.channel.createMessage("no guild id provided")

        row = await this.client.db.getRow("server", args[0])

        if(row.data == null) return message.channel.createMessage("no guild found")

        message.channel.createMessage(`the guilds prefix is ${row.data.prefix}`)

    }
}
