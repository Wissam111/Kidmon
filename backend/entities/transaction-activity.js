const { ValidationError } = require("../utils/errors")
const { ActivityTypes } = require("./activity")


const buildMakeTransactionActivity = (Id, makeActivity) => {

    return function makeParentUser({
        id,
        from, // required
        to, // required
        amount, // required
        createdAt,
        updatedAt
    }) {


        const activity = makeActivity({ id, type: ActivityTypes.transaction, createdAt, updatedAt })

        if (!from || !Id.isValid(from)) {
            throw new ValidationError('transaction activity must have a valid \'from\' field')
        }

        if (!to || !Id.isValid(to)) {
            throw new ValidationError('transaction activity must have a valid \'to\' field')
        }

        if (!amount) {
            throw new ValidationError('transaction activity must have an \'amount\' field')
        }


        if (amount < 0) {
            throw new ValidationError('transaction activity must have a valid amount field')
        }

        return Object.freeze({
            ...activity,
            from,
            to,
            amount,
        })
    }
}



module.exports = Object.freeze({
    buildMakeTransactionActivity,
})


