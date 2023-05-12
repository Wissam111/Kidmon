const { NotFoundError } = require("../../utils/errors")



const buildListUserSpendingsUseCase = ({ activityDb, userDb }) => {
    return async ({ userId, startDate, endDate }) => {

        const user = await userDb.findById({ id: userId })
        if (!user) {
            throw new NotFoundError("User not found")
        }

        return await activityDb.findUserSpendings({ id: userId, start_date: startDate, end_date: endDate })
    }
}



module.exports = {
    buildListUserSpendingsUseCase
}