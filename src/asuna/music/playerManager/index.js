Player = require('./functions/player');

/**
 * @class PlayerManager
 * @param client - the bots client to access the lavalink manager
 * @author Jade
 * @classdesc the main entry point for the player manager
 */
class PlayerManager {
    constructor(manager, client){
        this.player = new Player(manager, client);
    }
}

module.exports = PlayerManager