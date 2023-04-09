
const { createClient } = require('redis')
const { makeVerifyDb } = require('./verify-db')


const client = createClient();


const makeDb = async () => {
    if (!client.isOpen) {
        await client.connect();
    }
    return client
}



const verifyDb = makeVerifyDb({ makeDb })

module.exports = {
    verifyDb
}