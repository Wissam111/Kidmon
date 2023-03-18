const { connect: dbConnect, disconnect: dbDisconnect } = require("mongoose")
const configs = require("../../configs")
const UserRepository = require("./mongo-user-repository")
const ActivityRepository = require("./mono-activity-repository")



const connect = async (databaseURL) => {
    const connection = await dbConnect(databaseURL)
    connection.connection.on('error', (err) => {
        console.log(err)
    })
    return connection.connection.db
}

const disconnect = async () => {
    await dbDisconnect()
}



const makeRepositories = async () => {
    if(!configs.databaseURL){
        throw new Error("databaseURL is required as an Environment variable")
    }
    await connect(configs.databaseURL)


    return {
        userRepository: new UserRepository(),
        acitivtyRepository: new ActivityRepository(), //
    }
}

module.exports = {
    makeRepositories
}