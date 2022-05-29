module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild) {
        let logC = this.client.getChannel("422805308813869067")
        logC.createMessage(`[Left Guild]\nName: ${guild.name}\nID: ${guild.id}`)
        this.client.pf.removePrefix(guild.id)
    }
}