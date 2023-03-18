const { makeActivity } = require(".");
const { ValidationError } = require("../utils/errors");



const buildMakePurchaseActivity = () => {

    return function makeParentUser({
        id,
        type,
        user,
        items,
        price,
        createdAt,
        updatedAt
    }) {


        const activity = makeActivity({ id, type, createdAt, updatedAt })

        return Object.freeze({
            ...activity,
            user,
            items,
            price,
        })
    }
}



module.exports = Object.freeze({
    buildMakePurchaseActivity,
})


