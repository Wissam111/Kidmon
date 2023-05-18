const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { activityController } = require('../../controllers')
const { makeCheckAuthorization, makeRoleAuthorization } = require('../middleware/requireAuthorization')
const { USER_ROLES } = require('../../entities/user')
const { requireAuthentication } = require('../middleware/requireAuthentication')


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
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember, USER_ROLES.parent] }),
    activityController.getUserActivities)


router.get('/user-spendings',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required()
        })
    }),
    requireAuthentication,
    // makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    activityController.getUserSpendings)



router.get('/user-spending',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            date: Joi.string().required()
        })
    }),
    requireAuthentication,
    // makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    activityController.getUserSpendingAtDate)


router.post('/points-transfer',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            senderUserId: Joi.string().required(),
            receiverUserId: Joi.string().required(),
            amount: Joi.number().required(),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.parent] }),
    makeCheckAuthorization({ reqfieldName: 'senderUserId', reqDataField: 'body', userFieldName: 'id' }),
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
    // requireAuthentication,
    // makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    // makeCheckAuthorization({ reqfieldName: 'userId', reqDataField: 'body', userFieldName: 'id' }),
    activityController.purchase)



module.exports = router