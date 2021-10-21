class voteChecker {
    /**
     * @param {Object} client bot client
     * @param {Boolean} bypass value to bypass the vote lock
     * @returns Boolean
     * @description checks users status on votess
     */
    constructor(client) {
        this.client = client
        this.bypass = process.env.lockbypass
    }

    async checkVote(UID = String) {
        if (this.bypass == 'true') return true

        let user = await this.client.db.getRow("user", UID) 
        if (user.data == null) return false

        //if users have premium they bypass the vote lock
        if (user.data.premium == true) return true
        
        //checks if voteTime has expired or not
        return user.data.voteTime > Date.now() 
        
    }

}

module.exports = voteChecker