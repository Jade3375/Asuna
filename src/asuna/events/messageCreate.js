module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {
        if (message.author.bot) return;
        if(this.client.db.ready == false) return;

        let prefix;
        if(global.dev) {
            prefix = "a!"
        } else {
            prefix = await this.client.pf.getPrefix(message.guildID).toLowerCase()
        }
        
        let args = await message.content.slice(prefix.length).trim().split(' ');
        let temp = message.content.trim().split(' ');
        let cmd = args.shift().toLowerCase();

        if(getUserFromMention(temp[0]) == this.client.user.id) return message.channel.createMessage(`The prefix here is \`${prefix}\` please run ${prefix}help to see a list of commmands`)
        if (temp[0].toLowerCase() != `${prefix}${cmd}) return;

        if (this.client.commands.has(cmd)) {
            if(this.client.commands.get(cmd).conf.nsfw) {
                if(await this.client.voteChecker.checkVote(message.author.id) == false) return message.channel.createMessage(`Vote for the bot and use all vote commands for 12 hours https:\//top.gg/bot/420907324945989632/vote`)

                this.runCommand(cmd,message,args)
                return
            }
            this.runCommand(cmd,message,args)
        }
    }

    runCommand(cmd,message,args) {
        let command = this.client.commands.get(cmd)
        command.run(message, args, this.client)
        console.log(`[   Command   ]    ${cmd} has been used.`)
    }

}

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return mention
    }
}
