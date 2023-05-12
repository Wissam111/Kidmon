const { NotFoundError } = require("../../utils/errors")



const buildGetUserSpendingAtDateUseCase = ({ activityDb, userDb }) => {
    return async ({ userId, timezone, date }) => {
        
        const user = await userDb.findById({ id: userId })
        if (!user) {
            throw new NotFoundError("User not found")
        }

        return await activityDb.findSpendingAtDate({ id: userId, date, timezone })
    }
}

module.exports = {
    buildGetUserSpendingAtDateUseCase
}