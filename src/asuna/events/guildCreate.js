module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild) {
        let logC = this.client.getChannel("422805308813869067")
        //logC.createMessage(`[Joined Guild]\nName: ${guild.name}\nID: ${guild.id}`)
        logC.createMessage("`[Joined Guild]\nName: ${guild.name}\nID: ${guild.id}`") // Quick test, aka sanity check, will most likely revert in 2 nanoseconds
        this.client.pf.getPrefix(guild.id)
    }
}