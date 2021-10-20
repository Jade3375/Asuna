let Command = require('../../structures/command');
let randomPuppy =  require("random-puppy");

class Meme extends Command {
    constructor (client) {
        super(client, {
            name: "meme",
            description: "Get a random meme from Reddit!",
            usage: "%meme",
            aliases: ["dankmeme"]
        });
        this.client = client
    }

    async run(message, args) {
        let reddit = [
            "meme",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "AnimeFunny",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "AdviceAnimals"
        ]

        let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        let url = await randomPuppy(subreddit);

        let embed = new this.Embed()
          .setDescription(`Here is a meme from ${subreddit}!\n[[Meme]](${url})`)
          .setImage(url)
        message.channel.createMessage(embed.build());
    }
}
module.exports = Meme;