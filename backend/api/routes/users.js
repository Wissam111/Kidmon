const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { userController } = require('../../controllers')
const { imageUpload } = require('../middleware/image-file-uploader')
const path = require('path')


const router = Router()


router.post('/parent',
  imageUpload('image'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    })
  }),
  userController.createParentUser)



router.post('/family-member',
  imageUpload('image'),
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
  imageUpload('image'),
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
