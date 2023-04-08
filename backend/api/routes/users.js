const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { userController } = require('../../controllers')


module.exports = () => {


  const router = Router()

  
  router.post('/parent', userController.createParentUser)
  router.post('/family-member', userController.createFamilyMemberUser)
  router.post('/admin', userController.createAdminUser)

  router.get('/:userId', userController.getUser)


  // router.post('/signup-parent',
  //   celebrate({
  //     [Segments.BODY]: Joi.object().keys({
  //       name: Joi.string().required()
  //     })
  //   })
  //   , (req, res) => {

  //     console.log(req.body);


  //     res.status(200).json({
  //       message: 'hello world'
  //     })
  //   })




  // router.post('/signup-family-member',
  //   celebrate({
  //     [Segments.BODY]: Joi.object().keys({
  //       name: Joi.string().required()
  //     })
  //   })
  //   , (req, res) => {

  //     console.log(req.body);


  //     res.status(200).json({
  //       message: 'hello world'
  //     })
  //   })




  return router
}
