const { makeUserDb } = require("./user-db");



const fakeUserDb = makeUserDb()
module.exports = Object.freeze({
    fakeUserDb
})