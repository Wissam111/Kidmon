
module.exports = class MongodbTransaction {

    constructor(session) {
        this.session = session
    }

    getSession() {
        return this.session
    }

    async startTransaction() {
        this.session.startTransaction()
    }

    async commitTransaction() {
        await this.session.commitTransaction()
    }

    async abortTransaction() {
        await this.session?.abortTransaction()
    }
    async endTransaction() {
        await this.session?.endSession()
    }
}