module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (msg) {
        if(dev) console.log(`[      DEBUG      ] ${msg}`)
    }
}