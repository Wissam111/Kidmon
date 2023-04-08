

const buildMakeTransactionActivity = (makeActivity) => {

    return function makeParentUser({
        id,
        type,
        from,
        to,
        amount,
        createdAt,
        updatedAt
    }) {


        const activity = makeActivity({ id, type, createdAt, updatedAt })

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


