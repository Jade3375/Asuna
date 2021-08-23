const { isMaster } = require('cluster');
const { Fleet } = require('eris-fleet');
const path = require('path');
const { inspect } = require('util');

require('dotenv').config();

global.dev = (process.argv.includes('-d') || process.argv.includes('--dev'))

const options = {
    path: path.join(__dirname, "./asuna/asuna.js"),
    token: dev ? process.env.BETA_TOKEN : process.env.TOKEN,
    clusters: 1,
    shards: dev ? 1 : 6,
    whatToLog: {
        whitelist: ['admiral_start', 'cluster_start', 'cluster_ready', 'shard_connect', 'shard_ready', 'shard_disconnect', 'shard_resume', 'cluster_restart', 'cluster_shutdown', 'total_shutdown', 'all_clusters_launched']
    },
    clientOptions: {
        disableEvents: {"TYPING_START": false, "PRESENCE_UPDATE": false},
        messageLimit: 1,
        guildSubscriptions: false,
        largeThreshold: 50
    },
    startingStatus: {
        status: "online", 
        game: {
            name:"%help | Welcome messages!",
            type:2,
            url:null
        }
    }
}

let totalRunningClusters = 0;
const Admiral = new Fleet(options);

function clusterAddCount(m) {
    totalRunningClusters += 1;
}

function clusterRemoveCount(m) {
    totalRunningClusters -= 1;
}

if (isMaster) {
    process.title = "Asuna - Master"
    // Code to only run for your master process
    Admiral.on('other', m => console.log(`[Fleet-other] ${m}`));
    Admiral.on('debug', m => console.debug(`[Fleet-debug] ${m}`));
    Admiral.on('warn', m => console.warn(`[Fleet-warn] ${m}`));
    Admiral.on('error', m => {
        if(m == undefined || m == "undefined") return
        console.error(`[Fleet-error] ${m}`)
    });
    //Admiral.on('admiral_start', m => console.log('ASUNA: ' + m))
    Admiral.on('all', m => console.log('ASUNA: ' + m))
    // Logs stats when they arrive
    //Admiral.on('stats', m => console.log(m));
    //! For IPC MANAGER
    Admiral.on('cluster_shutdown', clusterRemoveCount)
    Admiral.on('HelloClusterUp', clusterAddCount)
    Admiral.on('cluster_died', clusterRemoveCount)
    Admiral.on('getTotalClusters', returnID => {
        Admiral.broadcast(returnID, totalRunningClusters)
    })
}