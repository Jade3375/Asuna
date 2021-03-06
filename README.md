# Asuna

Asuna is an Eris Discord bot with moderation, music and anime at the centre of it.

## About this repo

This repository contains the current version of Asuna's Eris rewrite.

## Relevent links
[Asuna's DBL listing](https://top.gg/bot/420907324945989632) // [Asuna API (Formally Weebs4Life)](https://asuna.ga/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# Setup

- create a .env file in the root of the project
- follow the following code 
``` 
#tokens
BETA_TOKEN=""
TOKEN=""
DBL=""
LAVALINK_PASS=""
WEBHOOK_PASS=""
DBPWD = ""

#defualts
lockbypass = false
prefix = "%"

#LAVALINK
LAVALINK_PORT=""
LAVALINK_IPS=""
LAVALINK_NAMES=""

#DB
DBIP = ""
DB = ""
USR = ""
MPORT = 

#misc
```

# Usable Listeners:
- listener NAME | whatToLog whitelist name
- admiral_start | admiral_start
- cluster_message | N/A
- stats_update | stats_update
- total_shutdown | total_shutdown
- service_launch | service_launch
- all_services_launched | all_services_launched
- cluster_launch | cluster_launch
- all_clusters_launched | all_clusters_launched
- shards_spread | shards_spread
- gateway_shards | gateway_shards
- cluster_shutdown | cluster_shutdown
- service_shutdown | service_shutdown
- cluster_restart | cluster_restart
- service_restart | service_restart
- cluster_start | cluster_start
- shard_connect | shard_connect
- shard_disconnect | shard_disconnect
- shard_ready | shard_ready
- shard_resume | shard_resume
- cluster_ready | cluster_ready
- shard_starting | N/A
note: most of these listeners are modifications on eris fleet, updating eris fleetn breaks all console.logs for some reason

## Disclaimer

Any file(s) hosted here are subject to change at any point. This code base comes as is, and we, the Asuna Development Team, do not accept any responsability for any damage caused due to misuse of this code base.
