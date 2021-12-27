let Command = require('../../structures/command');

class Rate extends Command {
    constructor (client) {
        super(client, {
            name: "rate",
            description: "I will rate whatever you want!",
            usage: "%rate",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let object = message.content.substring(5)
    	let rating = Math.floor(Math.random() * 10) +1;
        
        message.channel.createMessage( message.author.username + " **I give " + object + " a " + rating + "/10**!")
    }

    async slash(inter, data){
        let object = data.options[0].value;
        let rating = Math.floor(Math.random() * 10) + 1;
        inter.createMessage("**I give " + object + " a " + rating + "/10**!");
    }
}
module.exports = Rate;