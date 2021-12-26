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

    async slash(inter){

        let GUID = inter.guildID
        if (inter.data.options != undefined) GUID = inter.data.options[0].value

        let row = await this.client.db.getRow("staff", inter.member.id)
        if(row.data == null) return inter.createMessage("You are not a staff member.")

        row = await this.client.db.getRow("server", GUID)

        if(row.data == null) return inter.createMessage("No guild found")

        inter.createMessage(`The Guilds prefix is ${row.data.prefix}`)


    }
}
