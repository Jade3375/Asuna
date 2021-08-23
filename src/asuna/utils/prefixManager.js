class PrefixManager{
    constructor(client) {
        this.client = client
        this.prefixes = new Map()
    }

    async getPrefix(guild) {
        let PF = this.prefixes.get(guild)
        if(PF) return PF

        let row = await this.client.db.getRow("server", guild)
        if(row.data == null) return this._createPrefix(guild)

        PF = row.data.prefix
        this.prefixes.set(guild, PF)
        return PF
    }

    async _createPrefix(guild) {
        this.client.db.addRow("server", guild, {prefix: '%', logChannel: ' ', welcomeChannel: ' ', welcomeMessage: ` `, welcomeImage: ` `, welcomeToggle : false ,premium: false})
        return "%"
    }

    async cachePrefix(guild) {
        if(!this.prefixes.has(guild.id)) return
        else {
            let row = await this.client.db.getRow("server", guild)
            if(row.data == null) return false
            this.prefixes.set(guild, row.data.prefix)
            return true
        }
    }

    async changePrefix(guild, prefix) {
        let row = await this.client.db.getRow("server", guild)

        if(row.data == null) return false

        this.prefixes.set(guild, prefix)
        this.client.db.editRow("server", guild, {prefix: prefix})
        return true
    }

    async removePrefix(guild) {
        if(!this.prefixes.has(guild)) return

        this.prefixes.delete(guild)
        return true
    }
}
module.exports = PrefixManager