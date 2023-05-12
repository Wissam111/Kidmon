const { activityService } = require("../use-cases");


const transferPoints = async (req, res) => {
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



const getUserActivities = async (req, res) => {
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



const getUserSpendings = async (req, res, next) => {

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
    getUserSpendingAtDate
}