let loadCommads = require("./loadCommands");
let loadEvents = require("./loadEvents");

module.exports = class {
    constructor(client) {
        this.client = client
        this.cmd = new loadCommads(this.client);
        this.event = new loadEvents(this.client);
    }


    async func() {
        this.cmd.loadCommands()
    }
    
    async cmds() {
        this.cmd.loadCommands()
    }
}



