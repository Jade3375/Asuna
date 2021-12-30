let Command = require("../../structures/command");

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
                if(guild.welcome == undefined || guild.welcome.channel == "" || !guild.welcome.channel) return message.channel.createMessage("no welcome channel set")
                this.client.emit("guildMemberAdd", message.member.guild, message.member, {run: true})
                message.channel.createMessage("sending test welcome to set channel")
    }

    async slash(inter) {
        let perm = "manageGuild"
        let gObj = inter.channel.guild
        let userID = inter.member.id

        if(!this.checkPermInter(userID, gObj, perm)) return inter.createMessage(`You do not have the *${perm}* permission.`)
        
        let row = await this.client.db.getRow("server", inter.guildID);
        if (row.data == null) 
            return;

        let guild = row.data
        if(guild.welcome == undefined || guild.welcome.channel == "" || !guild.welcome.channel) return inter.createMessage("No Welcome Channel Set!")
        this.client.emit("guildMemberAdd", inter.member.guild, inter.member, {run: true})
        inter.createMessage("Sending test welcome to set channel...")

        
    }
};
