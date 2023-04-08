const { ActivityTypes } = require("./activity")



const buildMakePurchaseActivity = (makeActivity) => {

    return function makeParentUser({
        id,
        user, // required
        items, // required 
        price, // required
        createdAt,
        updatedAt
    }) {


        const activity = makeActivity({ id, type: ActivityTypes.purchase, createdAt, updatedAt })

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


