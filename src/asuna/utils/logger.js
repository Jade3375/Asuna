    /**
     * @param {Discord.Client} Client the discord.js client 
     * @param {String} args What is to be printed to console
     * @returns {console.log} loggs whatever to console
     */
function logger(Client, args, message) {
    if(Client.shard.id == undefined) return console.log(`[UNKNOWN SHARD] ${args}`)
    else {
        if(message.client ===  null || message.client === undefined) {
            console.log(`[SHARD ${Client.shard.id}] ${args}`)
        }
        else {
            //console.log(`[SHARD ${Client.shard.id}] ${args}`)
            console.log(`[SHARD ${message.guild.shard.id}] ${args}`)
        } 
    }
}
module.exports = logger