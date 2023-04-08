
const userController = require('./users-controller')
const productController = require('./products-controller')
const activityController = require('./activity-controller')
const authController = require('./auth-controller')







module.exports = Object.freeze({
    userController,
    productController,
    activityController,
    authController
})