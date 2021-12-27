module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (Interaction) {
        
        if(Interaction.member?.bot || Interaction.user?.bot) return;
        if (this.client.db.ready == false) return;

        //Interaction.createMessage("test")

        //return console.log(this.getCmd(Interaction.data))
        let parsedData = this.getCmd(Interaction.data)

        let cmd = this.client.commands.get(parsedData.name)

        if(cmd.conf.nsfw) {
            if (await this.client.voteChecker.checkVote(message.author.id) == false) return Interaction.createMessage(`Vote for the bot and use all vote commands for 12 hours https://top.gg/bot/420907324945989632/vote`)

            this.runSlash(cmd, Interaction, parsedData.options)
        }
        this.runSlash(cmd, Interaction, parsedData.options)
    }

    runSlash(cmd, Interaction, options) {
        cmd.slash(Interaction, options)
        if(this.client.cmdlogger == true) console.log(`[   Command   ] [   ${Interaction.guildID}   ]   ${cmd} has been used.`)
    }

    getCmd(data) {
        if(!data.options || data.options[0] != (1 || 2)) return {name: data.name, options: data.options}

        if(data.options[0].type == 2) {
            return this.getCmd(data.options[0])
        } else if(data.options[0].type == 1) {
            return {name: data.options[0].name, options: data.options}
        }
    }
    
}