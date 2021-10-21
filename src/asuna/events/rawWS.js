module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (pk) {
        if (pk.op === 0) {
            if (pk.t === "VOICE_SERVER_UPDATE")
                await this.client.lavalink.manager.serverUpdate(pk.d);
            
            else if (pk.t === "VOICE_STATE_UPDATE")
                await this.client.lavalink.manager.stateUpdate(pk.d);
        }
        else return;
    }
}