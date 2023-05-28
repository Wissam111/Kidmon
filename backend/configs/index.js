const dotenv = require('dotenv')

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}


module.exports = {
    /**
     * Your favorite port
     */
    port: process.env.PORT || 4000,

    /**
     * That long string from mlab
     */
    databaseURL: process.env.DEBUG === 'true' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI,

    databaseURLTest: process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017',

    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET,
    // jwtAlgorithm: process.env.JWT_ALGO,


    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    debug: process.env.DEBUG === 'true' ? true : false,

    auth_mode: process.env.AUTHORIZATION === 'true' ? true : false,

    apiVersion: 'v1',

    production: false,

    jwtSecret: 'secret',
};