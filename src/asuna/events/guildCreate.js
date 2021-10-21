module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild) {
        let logC = this.client.getChannel("422805308813869067")
        logC.createMessage(`[Joined A Server] ${guild.name} with the id \n[${guild.id}]`)
        this.client.pf.getPrefix(guild.id)
    }
}