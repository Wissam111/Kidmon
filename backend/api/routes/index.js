const usersRoute = require('./users')
const { Router } = require('express')
const { errors } = require('celebrate')


module.exports = async () => {
    const router = Router()

    router.use('/users', await usersRoute())
    router.use(errors())


    return router
}
