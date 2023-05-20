const { activityService } = require("../use-cases");


const transferPoints = async (req, res) => {
    // #swagger.tags = ['Acitvities']
    try {
        const { senderUserId, receiverUserId, amount } = req.body
        await activityService.transferPointsUserCase({ senderUserId, receiverUserId, amount })
        res.status(200).json({
            message: 'transfer points successfull'
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}





const purchase = async (req, res, next) => {
    // #swagger.tags = ['Acitvities']
    try {
        const { userId, items } = req.body
        await activityService.purchaseUseCase({ userId, items })
        res.status(200).json({
            message: 'purchase was successful',
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getActivites = async (req, res) => {
    // #swagger.tags = ['Acitvities']

    try {
        const { type, sort } = req.query
        const page = + req.query.page
        const pageSize = + req.query.pageSize

        const result = await activityService.listActivities({ filters: { type }, page, pageSize, sort })
        res.status(200).json({
            message: 'fetch activities successfull',
            activities: result.activities,
            count: result.count
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getUserActivities = async (req, res) => {
    // #swagger.tags = ['Acitvities']
    try {
        const { userId, sort } = req.query
        const page = + req.query.page
        const pageSize = + req.query.pageSize

        const activities = await activityService.listUserActivitiesUseCase({ userId, page, pageSize, sort })
        res.status(200).json({
            message: 'fetch activities successfull',
            activities
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}



const getFamilyMembersActivities = async (req, res) => {
    // #swagger.tags = ['Acitvities']


    try {
        const { userId, sort } = req.query
        const page = + req.query.page
        const pageSize = + req.query.pageSize

        const activities = await activityService.listFamilyMembersActivities({ userId, page, pageSize, sort })
        res.status(200).json({
            message: 'fetch family members activities successfull',
            activities
        })
    } catch (e) {
        console.log(e);
        next(e)
    }

}



const getUserSpendings = async (req, res, next) => {
    // #swagger.tags = ['Acitvities']
    try {
        const { userId, startDate, endDate } = req.query
        const spendings = await activityService.listUserSpendings({ userId: userId, startDate, endDate })
        res.status(200).json({
            message: 'fetched user spendings successfull',
            spendings
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}


const getUserSpendingAtDate = async (req, res, next) => {
    // #swagger.tags = ['Acitvities']

    try {
        const { userId, timezone, date } = req.query
        const data = await activityService.getUserSpendingAtDate({ userId: userId, timezone, date })
        res.status(200).json({
            message: 'fetched user spending successfull',
            data: data
        })
    } catch (e) {
        console.log(e);
        next(e)
    }
}




module.exports = {
    getUserActivities,
    purchase,
    transferPoints,
    getUserSpendings,
    getUserSpendingAtDate,
    getFamilyMembersActivities,
    getActivites
}