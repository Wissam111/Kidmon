const getUserActivities = require("./get-user-activities");
const purchase = require("./purchase");
const transferPoints = require("./transfer-points");




module.exports = {
    '/activities/points-transfer': transferPoints,
    '/activities/purchase': purchase,
    '/activities/user-activities': getUserActivities

}