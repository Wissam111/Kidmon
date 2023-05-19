const { NotFoundError } = require("../../utils/errors")



const buildListFamilyMembersActivitiesUseCase = ({ activityDb, userDb }) => {

    return async ({ userId, page, pageSize, sort }) => {
        const user = await userDb.findById({ id: userId, populate: false })
        if (!user) {
            throw new NotFoundError('User not found')
        }
        return await activityDb.findByFamilyMembers({ familyMembers: user.familyMembers, page, pageSize, sort })
    }
}


module.exports = { buildListFamilyMembersActivitiesUseCase }