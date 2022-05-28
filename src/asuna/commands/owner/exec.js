const Command = require('../../structures/command');
const childProcess = require('child_process');
let i = "```"

class Exec extends Command {
    constructor (client) {
        super(client, {
            name: "exec",
            description: "Executes a remote command. [DEVS ONLY]",
            usage: "%exec [COMMAND]",
            aliases: []
        });
        this.client = client
    }

    async run (message, args, client) { // eslint-disable-line no-unused-vars
        client.owners = ["165811958828761089", "181072300815286275"];
        if (!args[0]) return message.channel.createMessage("Can't run nothing dummy");
        if (!client.owners.includes(message.author.id)) return;
        childProcess.exec(args.join(' '), {},
            (err, stdout, stderr) => {
            if (err) return message.channel.createMessage(`${i}${err.message}${i}`);
            if (stdout.length > 2000) return message.channel.createMessage("Content is too big to send here try running it in the console.")
            message.channel.createMessage(`${i}${stdout}${i}`);
        });
    }
}
module.exports = Exec;
