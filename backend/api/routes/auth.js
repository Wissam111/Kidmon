const { authController } = require('../../controllers')
const { celebrate, Joi, Segments } = require('celebrate')


const router = require('express').Router()


router.post('/send-auth-verification',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            phone: Joi.string().required(),
        })
    }),
    authController.sendAuthVerification)



router.post('/login-verify-phone',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            code: Joi.string().required(),
            verifyId: Joi.string().required(),
        })
    }),
    authController.verifyAndLogin)


module.exports = router