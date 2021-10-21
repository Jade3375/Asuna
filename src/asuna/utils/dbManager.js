const { MongoClient } = require('mongodb')

class DB { 
    constuctor(Client) {
        this.client = Client
    }

    async connect() {
        this.host = process.env.DBIP;
        this.port = process.env.MPORT;
        this.database = process.env.DB;
        this.username = process.env.USR;
        this.password = process.env.DBPWD;
        this.ready = false;
        this.URI = `mongodb://${this.username ? `${this.username}:${this.password}@` : ''}${this.host}:${this.port}`
        this.db = new MongoClient(this.URI, {
            useUnifiedTopology: true
        })
        await this.db.connect();
        this.db = this.db.db(this.database);
        console.log(`[DB] Connnected`)
        this.ready = true
        return this.db;
    }
    /**
     * Get Row
     * @param {string} type server or user
     * @param {string} id server/user ID
     * 
     * client.db.getRow('server', '633405040006135808')
     */
    getRow(type, search) {
        return new Promise(async (resolve, reject) => {
            let data = await this.db.collection(type).findOne({
                id: search
            })
            resolve({
                data: data
            });
        });
    }
    /**
     * Add Row
     * @param {string} type server or user
     * @param {string} id server/user ID
     * @param {Object{}} data row data
     * 
     * client.db.addRow('server', '633405040006135808', {prefix: '%', premium: false)
     */
    addRow(type, id, data) {
        return new Promise(async (resolve, reject) => {
            let dataCheck = await this.db.collection(type).findOne({
                id: id
            })
            if (dataCheck !== null) reject({
                error: 'Row Already Exists',
                data: dataCheck
            })
            let insert = {}
            insert.id = id;
            Object.keys(data).forEach(key => {
                insert[key] = data[key]
            })
            let dataRet = await this.db.collection(type).insertOne(insert)
            resolve({
                data: dataRet
            });
        })
    }
    /**
     * editRow
     * @param {string} type server or user
     * @param {string} id server/user ID
     * @param {Object} data Object of values used to update
     * 
     * client.db.editRow('server', '633405040006135808', {prefix: 'owo'})
     */
    editRow(type, id, data) {
        return new Promise(async (resolve, reject) => {
            let setValue = {};
            let unsetValue = {};
            Object.keys(data).forEach(k => {
                if (data[k] == null) {
                    unsetValue[k] = ""
                } else {
                    setValue[k] = data[k]
                }
            })
            let valueObj = {}
            if (Object.keys(setValue).length > 0) valueObj['$set'] = setValue
            if (Object.keys(unsetValue).length > 0) valueObj['$unset'] = unsetValue
            let temp = await this.db.collection(type).updateOne({
                id: id
            }, valueObj)
            resolve({
                data: temp
            });
        });
    }
    /**
     * Delete Row
     * @param {string} type sever or user
     * @param {string} id server/user ID
     * 
     * client.db.deleteRow('server', '633405040006135808')
     */
    async deleteRow(type, id) {
        return new Promise(async (resolve, reject) => {
            let dataCheck = await this.db.collection(type).findOne({
                id: id
            })
            if (dataCheck == null) return {
                error: 'Row Doesnt Exists',
            }
            let temp = await this.db.collection(type).deleteOne({
                id: id
            })
            resolve({
                result: 'Deleted Row',
                data: dataCheck
            })
        });
    }
}
module.exports = DB