


const buildListUserActivitiesUseCase = ({ activityDb }) => {

    return async ({ userId, page, pageSize, sort }) => {
        return await activityDb.findByUserId({ id: userId, page, pageSize, sort })
    }
}


module.exports = { buildListUserActivitiesUseCase }