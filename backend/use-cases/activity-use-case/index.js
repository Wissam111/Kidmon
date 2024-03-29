const { activityDb, userDb, productDb } = require("../../data-access/mongodb");
const { buildGetUserSpendingAtDateUseCase } = require("./get-user-spending");
const { buildListActivitiesUseCaase } = require("./list-activities");
const { buildListFamilyMembersActivitiesUseCase } = require("./list-family-members-activities");
const { buildListUserActivitiesUseCase } = require("./list-user-activities");
const { buildListUserSpendingsUseCase } = require("./list-user-spendings");
const { buildPurchaseUseCase } = require("./purchase");
const { buildTransferPointsUserUseCase } = require("./transfer-points");


const listUserActivitiesUseCase = buildListUserActivitiesUseCase({ activityDb })
const transferPointsUserCase = buildTransferPointsUserUseCase({ userDb, activityDb })
const purchaseUseCase = buildPurchaseUseCase({ userDb, activityDb, productDb })
const listUserSpendings = buildListUserSpendingsUseCase({ activityDb, userDb })
const getUserSpendingAtDate = buildGetUserSpendingAtDateUseCase({ activityDb, userDb })
const listFamilyMembersActivities = buildListFamilyMembersActivitiesUseCase({ activityDb, userDb })
const listActivities = buildListActivitiesUseCaase({ activityDb })


module.exports = {
    listUserActivitiesUseCase,
    transferPointsUserCase,
    purchaseUseCase,
    listUserSpendings,
    getUserSpendingAtDate,
    listFamilyMembersActivities,
    listActivities
}