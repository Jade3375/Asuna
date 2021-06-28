const { Manager: LavaManager } = require("lavaclient");
const nodes = require('./nodes')

class Manager {
    constructor(client) {
        this.client = client
        this.nodes = nodes
        this.manager = new LavaManager(nodes, {
            shards: 1,
            send: (id, data) => {
                let guild = this.client.bot.guilds.get(id);

                if(guild) guild.shard.sendWS(data.op, data.d, false);
                
                return
            }
        })
    }

    async load() {
        await this.manager.init(this.client.bot.user.id);
        this.manager.on("socketError", ({id}, err) => console.error(`${id} had error ` + err))
        this.manager.on("socketReady", (node) => console.log(`${node.id} connected`))
        this.manager.on("socketClose", (node) => console.log(`${node.id} has Closed`));
        this.manager.on("socketDisconnect", (node) => console.log(`${node.id} has Disconnected`));
    }
}
module.exports = Manager