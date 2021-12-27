let Command = require('../../structures/command');

class BallOf8 extends Command {
    constructor (client) {
        super(client, {
            name: "8ball",
            description: "Ask the Magic 8 Ball anything!",
            usage: "8ball [QUESTION]",
            aliases: []
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

        if (args[0] != null) { //Checks if args[0] has a question
            let embed = new this.Embed()
              .setTitle("8-ball knows all")
              .addField("The answer is...", eightball[Math.floor(Math.random() * eightball.length).toString(16)] )
            message.channel.createMessage(embed.build())
        }

        else message.channel.createMessage("What is your question? {usage %8ball question}") // If no question send this message to chat
    }

    async slash(inter, options){ 
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
            let embed = new this.Embed()
              .setTitle("8-ball knows all")
              .addField("Question", options[0].value)
              .addField("The answer is...", eightball[Math.floor(Math.random() * eightball.length).toString(16)] )
              .setTimestamp()
              inter.createMessage(embed.build())

    }
}
module.exports = BallOf8;