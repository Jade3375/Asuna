const Command = require('../../structures/command');
const fs = require("fs")

class Eval extends Command {
    constructor (client) {
        super(client, {
            name: "eval",
            description: "OwO vewwy impowtant stuwfs UwU",
            usage: "eval",
            aliases: []
        });
        this.client = client
    }

    async run (message, args) { // eslint-disable-line no-unused-vars

        let owners = ["165811958828761089", "431743926974808076", "181072300815286275", "258785659626455060"];
        if (!owners.includes(message.author.id)) return;

        try {
            let code = message.content.split(" ").slice(1).join(" ");

            if (!code) return message.channel.createMessage('i *do* need smth to eval, right?');

            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, {
                    depth: 0
                });

            if (evaled.length > 1024) {
                fs.writeFile("./output.txt", (evaled), (err) => {
                    if (err) console.log(err)
                });
                return message.channel.createMessage('ayy ... the output was longer than 1024 in length, so i put it in this file ... yw', {
                    files: [{
                        attachment: './output.txt',
                        name: 'results.txt'
                    }]
                });
            };

            if (code.includes('client.token')) throw new Error("No Thanks");

            if (code.includes('bot.token')) throw new Error("No Thanks");

            if (code.includes('Client.token')) throw new Error("No Thanks");

            if (code.includes('Client.destroy()')) throw new Error("No Thanks");

            let embed = new this.Embed()
            .setDescription("```js\ninput```\n```js\n" + code + "```\n ```js\noutput```\n```js\n" + evaled + "```\n")
            .setColor("")
            this.client.globalEmbedData(embed)

            message.channel.createMessage(embed.build())

        } catch (err) {
            
            message.channel.createMessage(`${err}`);
        }
    };
}
module.exports = Eval;
