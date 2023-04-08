const usersRoutes = require('./users')
const productRoutes = require('./products')
const { Router } = require('express')
const { errors } = require('celebrate')


module.exports = () => {
    const router = Router()

    router.use('/users', usersRoutes())
    router.use('/products', productRoutes)

    router.use(errors())
    return router
}
