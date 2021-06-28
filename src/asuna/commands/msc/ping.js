const Command = require('../../structures/command');

class Ping extends Command {
    constructor (client) {
        super(client, {
            name: "ping",
            description: "Latency and API response times.",
            usage: "ping",
            aliases: ["pong"]
        });
        this.client = client
    }

    async run (message, args) {
        let msg = await message.channel.createMessage("🏓 Ping!");
        msg.edit(`🏓 Pong! (Roundtrip took: ${msg.timestamp - message.timestamp}ms. 💙: ${Math.round(message.channel.guild.shard.latency)}ms.)`);
    }
}
module.exports = Ping;