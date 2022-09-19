module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run () {
        let game = {name:"@AsunaHelp | Welcome Messages",type:2}
        this.client.shards.get(0).editStatus("online", game)
    }
}
