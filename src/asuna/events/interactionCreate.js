module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (Interaction) {
        if(this.client.commands.has(Interaction.data.name)) this.client.commands.get(Interaction.data.name).slash(Interaction)
    }
}