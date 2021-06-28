let Command = require('../../structures/command');

class BallOf8 extends Command {
    constructor (client) {
        super(client, {
            name: "8ball",
            description: "8-ball OwO?",
            usage: "8ball [question]",
            aliases: [ ]
        });
        this.client = client
    }

    

    async run(message, args) {

        let eightball = [ 
                "Yes!",
                "No...",
                "Maybe?",
                "Probably.",
                "I don't think so.",
                "Never!",
                "You can try...",
                "Up to you!",
                "OH HELLL NAW!!!!!!",
        ]

        if (args[0] != null) {// checks if args[0] has a question
            let embed = new this.Embed()
            .setTitle("8-ball knows all")
            .addField("The answer is...", eightball[Math.floor(Math.random() * eightball.length).toString(16)] )
            message.channel.createMessage(embed.build())
        }
        
         else message.channel.createMessage("What is your question? {usage %8ball question}")// if no question send this message to chat
    }
}
module.exports = BallOf8;