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
        res.status(500).json({
            message: 'error'
        })
    }
}





const purchase = async (req, res) => {
    try {
        const { userId, items } = req.body
        await activityService.purchaseUseCase({ userId, items })
        res.status(200).json({
            message: 'purchase was successful',
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'error'
        })
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
        res.status(500).json({
            message: 'error'
        })
    }
}



module.exports = {
    getUserActivities,
    purchase,
    transferPoints
}