let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            description: "Reloads all commands and events. [DEVS ONLY]",
            usage: "%reload",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let owners = ["165811958828761089", "181072300815286275", "431743926974808076"];
        if (!owners.includes(message.author.id)) return;

        
        message.channel.createMessage("Reloaded commands and events successfully.")
        this.client.load.cmds()
        this.client.load.events()
    }

    async slash(inter) {
        let owners = ["165811958828761089", "181072300815286275", "431743926974808076"];
        if (!owners.includes(inter.member.id)) return inter.createMessage("This is a bot developer only command.");

        
        inter.createMessage("Reloaded commands and events successfully.")
        this.client.load.cmds()
        this.client.load.events()
    }
}
