const { ActivityTypes } = require("../../entities/activity")


const buildListActivitiesUseCaase = ({ activityDb }) => {

    return async ({ search = "", page, pageSize = 10, sort = "desc", filters }) => {
        return await activityDb.find({ page, pageSize, sort, filters: filters })
    }

}


module.exports = {
    buildListActivitiesUseCaase
}