
const { createClient } = require('redis')
const { makeVerifyDb } = require('./verify-db');
const { makeDashboardDb } = require('./dashboard-db');


const client = createClient();


const makeDb = async () => {
    if (!client.isOpen) {
        await client.connect();
    }
    return client
}


const verifyDb = makeVerifyDb({ makeDb })
const dashboardDb = makeDashboardDb({ makeDb })


module.exports = {
    verifyDb,
    dashboardDb,
    redisMake: makeDb
}