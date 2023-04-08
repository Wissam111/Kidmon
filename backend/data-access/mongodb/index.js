const { connect, disconnect, default: mongoose } = require("mongoose")
const configs = require("../../configs")
const { makeUserDb } = require("./users-db")
const { makeProductDb } = require("./products-db")
const { makeActivityDb } = require("./activity-db")



const makeDb = async () => {
    if (!configs.databaseURL) {
        throw new Error("databaseURL is required as an Environment variable")
    }
    const connection = await connect(configs.databaseURL)
    return connection.connection.db
}




const userDb = makeUserDb({ makeDb })
const productDb = makeProductDb({ makeDb })
const activityDb = makeActivityDb({ makeDb })

module.exports = {
    userDb,
    productDb,
    activityDb
}