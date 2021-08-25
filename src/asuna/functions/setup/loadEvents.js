const { readdirSync, readdir } = require('fs');
const path = require("path")

class LoadEvents {
    constructor(client) {
        this.client = client

        this.loadEvents()
    }
    
    async loadEvents() {
        readdir(__dirname + '/../../events/', (err, files) => {
            if(err) {
                console.log(err);

            }
            else {
                console.log(`loading ${files.length} events`);
                files.forEach(file => {
                    let eventName = file.split(".")[0];
                    let event = new (require(__dirname + `/../../events/${file}`))(this.client);
                    this.client.off(eventName, (...args) => event.run(...args));
                    this.client.on(eventName, (...args) => event.run(...args));
                    delete require.cache[require.resolve(__dirname + `/../../events/${file}`)];
                })
            }
        })
    }
}
module.exports = LoadEvents