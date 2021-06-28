module.exports = {
    apps: [{
        name: "AsunaBot",
        script: "./src/index.js",
        autorestart: true,
        watch: false,
        env:{
            LD_PRELOAD: "/home/jade/test/jemalloc/lib/libjemalloc.so.2"
        }
    }]
}