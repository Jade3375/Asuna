let Command = require('../../structures/command');

class Roll extends Command {
    constructor (client) {
        super(client, {
            name: "roll",
            description: "Roll a random number between 1 and 100!",
            usage: "%roll",
            aliases: []
        });
        this.client = client
    }

    async run(message, args) {
        let roll = Math.floor(Math.random() * 100) +1;
        
        message.channel.createMessage(`You rolled a ${roll}!`)
    }

    async slash(inter) {

        let max = 100
        if (inter.data.hasOwnProperty('options'))
            max = inter.data.options[0].value;
        let roll = Math.floor(Math.random() * max) + 1
        

        inter.createMessage(`You rolled a ${roll}`)
    }
}
module.exports = Roll;