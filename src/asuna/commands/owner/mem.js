let Command = require('../../structures/command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "mem",
            description: "gets memory ",
            usage: "mem",
            aliases: []
        });
    }

    async run(message,args) {

        let mem = process.memoryUsage();
        mem.rss = Math.round(mem.rss / 1024 / 1024 * 100) / 100
        mem.heapTotal = Math.round(mem.heapTotal / 1024 / 1024 * 100) / 100
        mem.heapUsed = Math.round(mem.heapUsed / 1024 / 1024 * 100) / 100
        mem.arrayBuffers = Math.round(mem.arrayBuffers / 1024 / 1024 * 100) / 100
        mem.external = Math.round(mem.external / 1024 / 1024 * 100) / 100

        mem = require("util").inspect(mem, {
            depth: 0
        });
        
        let embed = new this.Embed()
        .setTitle("Memory")
        .setDescription(`\`\`\`js\n ${mem} \`\`\` `)

        message.channel.createMessage(embed.build())
    }

    async slash(inter){
        let mem = process.memoryUsage()
        mem.rss = Math.round(mem.rss / 1024 / 1024 * 100) / 100
        mem.heapTotal = Math.round(mem.heapTotal / 1024 / 1024 * 100) / 100
        mem.heapUsed = Math.round(mem.heapUsed / 1024 / 1024 * 100) / 100
        mem.arrayBuffers = Math.round(mem.arrayBuffers / 1024 / 1024 * 100) / 100
        mem.external = Math.round(mem.external / 1024 / 1024 * 100) / 100

        mem = require("util").inspect(mem, {
            depth: 0
        });
        
        let embed = new this.Embed()
        .setTitle("Memory")
        .setDescription(`\`\`\`js\n ${mem} \`\`\` `)

        inter.createMessage(embed.build())
    }
}
