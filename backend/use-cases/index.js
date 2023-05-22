const userService = require("./user-use-case")
const productService = require("./product-use-case")
const activityService = require("./activity-use-case")
const authService = require("./auth-use-case")
const dashboardService = require("./dashboard-use-case")



module.exports = Object.freeze({
    userService,
    productService,
    activityService,
    authService,
    dashboardService
})