const { connect, default: mongoose } = require("mongoose")
const configs = require("../../configs")
const { makeUserDb } = require("./users-db")
const { makeProductDb } = require("./products-db")
const { makeActivityDb } = require("./activity-db")



/**
 *  0: disconnected
    1: connected
    2: connecting
    3: disconnecting
 */

const makeDb = async () => {
    if (!configs.databaseURL) {
        throw new Error("databaseURL is required as an Environment variable")
    }
    if (mongoose.connection.readyState !== 1) {
        console.log('connecting to database');
        await connect(configs.databaseURL)
    }
}



const userDb = makeUserDb({ makeDb })
const productDb = makeProductDb({ makeDb })
const activityDb = makeActivityDb({ makeDb })

module.exports = {
    userDb,
    productDb,
    activityDb
}