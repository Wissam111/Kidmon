const { activityDb, userDb, productDb } = require("../../data-access/mongodb");
const { buildListUserActivitiesUseCase } = require("./list-user-activities");
const { buildPurchaseUseCase } = require("./purchase");
const { buildTransferPointsUserUseCase } = require("./transfer-points");


const listUserActivitiesUseCase = buildListUserActivitiesUseCase({ activityDb })
const transferPointsUserCase = buildTransferPointsUserUseCase({ userDb, activityDb })
const purchaseUseCase = buildPurchaseUseCase({ userDb, activityDb, productDb })

module.exports = {
    listUserActivitiesUseCase,
    transferPointsUserCase,
    purchaseUseCase
}