const { ValidationError } = require("../utils/errors")
const { ActivityTypes } = require("./activity")



const buildMakePurchaseActivity = (makeActivity) => {

    return function makePurchaseActivity({
        id,
        user, // required
        items, // required 
        price, // required
        createdAt,
        updatedAt
    }) {


        const activity = makeActivity({ id, type: ActivityTypes.purchase, createdAt, updatedAt })

        if (!user) {
            throw new ValidationError('purchase activity must have a user')
        }

        if (!items) {
            throw new ValidationError('purchase activity must have items')
        }

        if (!price) {
            throw new ValidationError('purchase activity must have a price')
        }

        if (price < 0) {
            throw new ValidationError('purchase activity price must be at least 0')
        }

        items.forEach(item => {
            if (!item['id'] || !item['amount']) {
                throw new ValidationError('purchase activity items must have an id and amount attributes')
            }
        })

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


