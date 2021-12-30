let Command = require('../../structures/command');
const fetch = require("node-fetch");

class Nsfw extends Command {
    constructor (client) {
        super(client, {
            name: "nsfw",
            description: "Display an NSFW Image",
            usage: "nsfw [category]",
            aliases: [ ]
        });
        this.client = client
    }

    async run(message, args) {
        let categories = 
        [
        "anal", 
        "ass", 
        "boobs", 
        "foxgirl", 
        "hass", 
        "hboobs", 
        "hentai", 
        "hneko", 
        "hthigh", 
        "pussy", 
        "tentacle", 
        "thigh", 
        "yaoi"
        ]

        

        if(!args[0]) return message.channel.createMessage("You need to enter a NSFW Category! Use \`/help\` to get a list.")
        if(args[0] == "foxgirl") args[0] = "hkitsune"
        if(!categories.includes(args[0])) return message.channel.createMessage("Invalid NSFW Category, please try again. Use \`/help\` to get a list.")
        if (message.channel.nsfw){
            fetch(`https://nekobot.xyz/api/image?type=${args[0]}`)
            .then(res => res.json())
            .then(json => {
                let responses = ['oh my that\'s lewd', 'ara ara', 'don\'t get all hot and bothered now']
                let embed = new this.Embed()
                .setColor("#FF69B4")
                .setDescription(`<@${message.author.id}> enjoy. ${responses[Math.floor(Math.random() * responses.length)]}`)
                .setImage(json.message)
                .setTimestamp()
                message.channel.createMessage(embed.build())
            })
        }else message.channel.createMessage(":warning: This channel is not marked as NSFW :warning:")
    }




    

    async slash(inter, data) {
        console.log(data)
        let category = data.value

        if (inter.channel.nsfw){
            fetch(`https://nekobot.xyz/api/image?type=${category}`)
            .then(res => res.json())
            .then(json => {
                let responses = ['oh my thats lewd', 'ara ara', 'don\'t get all hot and bothered now']
                let embed = new this.Embed()
                .setColor("#FF69B4")
                .setDescription(`<@${inter.member.id}> enjoy. ${responses[Math.floor(Math.random() * responses.length)]}`)
                .setImage(json.message)
                .setTimestamp()
                inter.createMessage(embed.build())
            })
        }else inter.createMessage(":warning: This channel is not marked as NSFW :warning:")
    }
    }

module.exports = Nsfw;