const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { activityController } = require('../../controllers')


const router = Router()



router.get('/user-activities',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            page: Joi.number(),
            pageSize: Joi.number(),
            sort: Joi.string(),
        })
    }),
    activityController.getUserActivities)



router.post('/points-transfer',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            senderUserId: Joi.string().required(),
            receiverUserId: Joi.string().required(),
            amount: Joi.number().required(),
        })
    }),
    activityController.transferPoints)



router.post('/purchase',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            userId: Joi.string().required(),
            items: Joi.array().items(Joi.object().keys({
                id: Joi.string().required(),
                amount: Joi.number().required(),
            })).required()
        })
    }),
    activityController.purchase)



module.exports = router