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

    async slash(inter) {
        await inter.acknowledge()
        let msg = await this.client.createMessage(inter.channel.id, "🏓 Pong!");
        let message = await inter.getOriginalMessage()
        let followup = await inter.createFollowup(`Roundtrip took: ${msg.timestamp - message.timestamp}ms. 💙: ${Math.round(message.channel.guild.shard.latency)}ms.`)
        console.log(message.channel.guild.shard.latency)

        followup.edit(`Roundtrip took: ${msg.timestamp - message.timestamp}ms. 💙: ${Math.round(message.channel.guild.shard.latency)}ms.`)
    }
}
module.exports = Ping;