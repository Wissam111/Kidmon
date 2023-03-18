const MongodbTransaction = require("./mongodb-transaction")
const User = require("./schema/user")




module.exports = class ActivityRepository {

    async findById(id, transaction) {
        throw new Error("Method not implemented.")
    }
    async create(data, transaction) {
        throw new Error("Method not implemented.")
    }

    async update({ id, updatedData }, transaction) {
        throw new Error("Method not implemented.")
    }
    async delete({ id }, transaction) {
        throw new Error("Method not implemented.")
    }

    async makeTransaction() {
        const session = await User.startSession()
        return new MongodbTransaction()
    }

}