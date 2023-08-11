const cron = require("node-cron");
const { userDb } = require("../data-access/mongodb");
const { Limits } = require("../entities/family-member-user");



cron.schedule("0 0 * * 1-7", function () {
    console.log("---------------------");
    console.log("running a task every 15 seconds");
    // runs every day to clear the daily limits

    userDb.updateLimitsValues({ limitName: Limits.daily, limitValue: 0 })
})



cron.schedule("0 0 * * 7", function () {
    console.log("---------------------");
    console.log("reseting weekly limits");
    // runs every week to clear the daily limits

    userDb.updateLimitsValues({ limitName: Limits.weekly, limitValue: 0 })

});



cron.schedule("0 0 * 1-12 *", function () {
    console.log("---------------------");
    console.log("reseting monthly limits");
    // runs every month to clear the daily limits

    userDb.updateLimitsValues({ limitName: Limits.monthly, limitValue: 0 })
});