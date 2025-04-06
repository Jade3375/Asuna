const ips = ""
const names = ""
const nodes = []

for (let i = 0; i < ips.length; i++) {
    nodes.push({
        id: names[i],
        host: ips[i],
        port: process.env.LAVALINK_PORT,
        password: process.env.LAVALINK_PASS
    })
}
module.exports = nodes;