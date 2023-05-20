const { makeActivityDb } = require("./activity-db");
const { makeProductDb } = require("./product-db");
const { makeUserDb } = require("./user-db");



const fakeUserDb = makeUserDb()
const fakeActivityDb = makeActivityDb()
const fakeProductDb = makeProductDb()

module.exports = Object.freeze({
    fakeUserDb,
    fakeActivityDb,
    fakeProductDb
})