const { Message } = require('eris');

const Embed = require('../utils/Embed')
class Command {

    constructor(client, {
        name = null,
        description = "No description provided.",
        category = "Miscellaneous",
        usage = "No usage provided.",
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        nsfw = false
    }) {
    this.client = client;
    this.conf = {
        enabled,
        guildOnly,
        aliases,
        nsfw
    };
    this.help = {
        name,
        description,
        category,
        usage
    };
    this.Embed = Embed
    }
    
    /**
     * Check if bot has perms
     * @param {Message} message Message Object
     * @param {String} permission String of the permission being checked
     * @returns {Boolean} true if permission is present
     */
    checkPerm(UID, message, permission) {
        if (message.channel.guild.members.get(UID).permission.json.administrator == true) return true

        return message.member.guild.members.get(UID).permission.json[permission]
    }

    /**
     * 
     * @param {String} mention String of the user mention
     * @returns {String} userID
     */
    getUserFromMention(mention) {
        if (!mention) return;
    
        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);
    
            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
    
            return mention
        }
    }

}
module.exports = Command;