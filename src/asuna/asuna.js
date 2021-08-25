const { BaseClusterWorker } = require('eris-fleet');
const setup = require('./functions/setup/');
const dbManager = require('./utils/dbManager');
const Manager = require("./functions/lavalink");
const MusicManager = require('./music/playerManager/index');
const Embed = require('./utils/Embed');
const weebs = require("weebs4life");
const Eris = require("eris");
const colours = ['#fffffe', '#fefafa', '#ea727c', '#c43b4d', '#85334c'];
const PF = require('./utils/prefixManager');
const voteChecker = require('./utils/voteChecker')

class Asuna extends BaseClusterWorker {
    constructor(setup){
        super(setup)
        this.bot.ipc = this.ipc
        this.bot.game = {name:"%help | Welcome Messages!",type:2}
        this.bot.status = "online"
        this.bot.weeb = new weebs();
        this.bot.db = new dbManager(this.bot);
        this.bot.pf = new PF(this.bot)
        this.bot.lavalink = new Manager(this)
        this.bot.commands = new Map();
        this.bot.aliases = new Map();
        this.bot.prefix = new Map();
        this.bot.musicManager = new MusicManager(this.bot.lavalink, this.bot);
        this.bot.voteChecker =  new voteChecker(this.bot, process.env.lockbypass)
        this.bot.Embed = Embed
        this.bot.status.intents = 4739
        this.bot.globalEmbedData = function(embed) {
            embed.setTimestamp()
                .setColor(colours[Math.floor(Math.random() * colours.length)])
        }
        this.bot.clusterIF = {clusterID: this.clusterID, workerIDL: this.workerID}
        this.startBot()
        process.title = `Asuna - Cluster [${this.clusterID} | Worker ${this.workerID}]`
        
    }

    async startBot() {
        this.bot.db.connect()
        this.bot.load = new setup(this.bot)
        this.bot.lavalink.load()
        this.bot.editStatus(this.bot.status, this.bot.game)
    }

}

module.exports = { BotWorker: Asuna, Eris }