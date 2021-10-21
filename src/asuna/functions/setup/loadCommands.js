const { readdirSync, readdir } = require('fs');
const path = require("path")

class Functions {
    constructor(Client) {
        this.Client = Client
        this.loadCommands()
    }

    _loadCommand = (commandPath, commandName, folder) => {
        const props = new (require(`${commandPath}${path.sep}${commandName}`))(this.Client);
        //just an easy way to reload commands having cache yeeted
        delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}`)]
        props.conf.location = commandPath;
        props.help.category = folder;

        if (props.init)
            props.init(this.Client);

        this.Client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            this.Client.aliases.set(alias, props.help.name);
        });
        return false;
    }

    loadCommands = async () => {
        readdirSync(__dirname + "/../../commands/").forEach((folder) => {
            readdirSync(__dirname + `/../../commands/${folder}`).filter(file => file.endsWith('.js')).forEach((f) => {
                this._loadCommand(__dirname + `/../../commands/${folder}`, f, folder)
            });
        });
    } 
}
module.exports = Functions