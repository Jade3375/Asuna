let Command = require("../../structures/command");
let util = require('util')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "welcometest",
            description: "sends test image",
            usage: "%welcometest",
            aliases: []
        });
        this.client = client;
    }

    async run(message, args) {
        let perm = "manageGuild"
        //user and bot permission check
        if(!this.checkPerm(message.author.id, message, perm)) return message.channel.createMessage(`You do not have the *${perm}* permission`)

        let row = await this.client.db.getRow("server", message.guildID);
        if (row.data == null) 
            return;
        
        let guild = row.data
                if(guild.welcomeChannel == "" || !guild.welcomeChannel) return message.channel.createMessage("no welcome channel set")
                this.client.emit("guildMemberAdd", message.member.guild, message.member)
                message.channel.createMessage("sending test welcome to set channel")
    }
};
