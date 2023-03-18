const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const usersController = require('../../controllers/users-controller')

module.exports =  async () => {
  const controller = await usersController()

  const router = Router()

  router.post('/', controller.createUser)


  router.post('/signup-parent',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
      })
    })
    , (req, res) => {

      console.log(req.body);


      res.status(200).json({
        message: 'hello world'
      })
    })




  router.post('/signup-family-member',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
      })
    })
    , (req, res) => {

      console.log(req.body);


      res.status(200).json({
        message: 'hello world'
      })
    })




  return router
}
