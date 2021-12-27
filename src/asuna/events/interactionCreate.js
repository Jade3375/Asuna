module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (Interaction) {
        
        if(Interaction.member?.bot || Interaction.user?.bot) return;
        if (this.client.db.ready == false) return;

        let cmd = this.client.commands.get(Interaction.data.name)

        if(cmd.conf.nsfw) {
            if (await this.client.voteChecker.checkVote(message.author.id) == false) return Interaction.createMessage(`Vote for the bot and use all vote commands for 12 hours https://top.gg/bot/420907324945989632/vote`)

            this.runSlash(cmd, Interaction)
        }
        this.runSlash(cmd, Interaction)
    }

    runSlash(cmd, Interaction) {
        cmd.slash(Interaction)
        if(this.client.cmdlogger == true) console.log(`[   Command   ] [   ${Interaction.guildID}   ]   ${cmd} has been used.`)
    }
    
}