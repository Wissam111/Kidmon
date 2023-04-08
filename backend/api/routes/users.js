const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { userController } = require('../../controllers')




const router = Router()


router.post('/parent',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    })
  }),
  userController.createParentUser)



router.post('/family-member',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      braceletId: Joi.string().required(),
      parentId: Joi.string().required(),
      allergies: Joi.array().items(Joi.string()),
    })
  }),
  userController.createFamilyMemberUser)



router.post('/admin',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    })
  }),
  userController.createAdminUser)



router.get('/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: Joi.string().required()
    })
  }),
  userController.getUser)


module.exports = router
