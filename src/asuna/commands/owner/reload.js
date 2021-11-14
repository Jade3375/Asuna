let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "reload",
            description: "relaods all commands",
            usage: "reload",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let owners = ["165811958828761089", "181072300815286275"];
        if (!owners.includes(message.author.id)) return;

        
        message.channel.createMessage("reloaded commands and events")
        this.client.load.cmds()
        this.client.load.events()
    }
}
