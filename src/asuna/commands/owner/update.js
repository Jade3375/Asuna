const Command = require('../../structures/command');
const childProcess = require('child_process');
let i = "```"

class Exec extends Command {
    constructor (client) {
        super(client, {
            name: "update",
            description: "Updates Asuna to the latest commit. [DEVS ONLY]",
            usage: "%update",
            aliases: []
        });
        this.client = client
    }

    async run (message, args, client) { // eslint-disable-line no-unused-vars
        client.owners = ["165811958828761089", "181072300815286275"];
        if (!client.owners.includes(message.author.id)) return;
        childProcess.exec("git pull", {},
            (err, stdout, stderr) => {
            if (err) return message.channel.createMessage(`${i}${err.message}${i}`);
            if (stdout.length > 2000) return message.channel.createMessage("Content is too big to send here, try running it in the console.")
            message.channel.createMessage(`${i}${stdout}${i}`);
        });
    }

    async slash(inter) {

        client.owners = ["165811958828761089", "181072300815286275"];
        if (!client.owners.includes(inter.member.id)) return inter.createMessage("This is a developer-only command.");
        childProcess.exec("git pull", {},
            (err, stdout, stderr) => {
            if (err) return inter.createMessage(`${i}${err.message}${i}`);
            if (stdout.length > 2000) return inter.createMessage("Content is too big to send here, try running it in the console.")
            inter.createMessage(`${i}${stdout}${i}`);
        });

    }
}
module.exports = Exec;
