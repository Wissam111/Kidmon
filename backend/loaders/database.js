const { mongoDbMake } = require("../data-access/mongodb")
const { redisMake } = require("../data-access/redis")



module.exports = async () => {
    // make and connect to MongoDB
    await mongoDbMake()
    await redisMake()
}