const getUserActivities = require("./get-user-activities");
const getUserSpending = require("./get-user-spending");
const getUserSpendings = require("./get-user-spendings");
const purchase = require("./purchase");
const transferPoints = require("./transfer-points");




module.exports = {
    '/activities/points-transfer': transferPoints,
    '/activities/purchase': purchase,
    '/activities/user-activities': getUserActivities,
    '/activities/user-spending': getUserSpending,
    '/activities/user-spendings': getUserSpendings
}