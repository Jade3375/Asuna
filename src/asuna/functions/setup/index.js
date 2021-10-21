let loadCommads = require("./loadCommands");
let loadEvents = require("./loadEvents");

module.exports = class {
    constructor(client) {
        this.client = client
        this.cmd = new loadCommads(this.client);
        this.event = new loadEvents(this.client);
    }

    async cmds() {
        this.cmd.loadCommands()
    }

    async events() {
        this.event.loadEvents()
    }
}