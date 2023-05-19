const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { activityController } = require('../../controllers')
const { makeFieldAuthorization, makeRoleAuthorization } = require('../middleware/requireAuthorization')
const { USER_ROLES } = require('../../entities/user')
const { requireAuthentication } = require('../middleware/requireAuthentication')


const router = Router()


router.get('/family-members-activities',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            page: Joi.number().allow(null),
            pageSize: Joi.number().allow(null),
            sort: Joi.string().valid("desc", "asc").allow(null),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.parent] }),
    makeFieldAuthorization({ reqData: { in: 'query', field: 'userId' }, userField: 'id' }),
    activityController.getFamilyMembersActivities)



router.get('/user-activities',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            page: Joi.number(),
            pageSize: Joi.number(),
            sort: Joi.string().valid("desc", "asc"),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    makeFieldAuthorization({ reqData: { in: 'query', field: 'userId' }, userField: 'id' }),
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
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    makeFieldAuthorization({ reqData: { in: 'query', field: 'userId' }, userField: 'id' }),
    activityController.getUserSpendings)



router.get('/user-spending',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            userId: Joi.string().required(),
            date: Joi.string().required()
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    makeFieldAuthorization({ reqData: { in: 'query', field: 'userId' }, userField: 'id' }),
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
    makeFieldAuthorization({ reqData: { in: 'body', field: 'senderUserId' }, userField: 'id' }),
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
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember] }),
    makeFieldAuthorization({ reqData: { in: 'body', field: 'userId' }, userField: 'id' }),
    activityController.purchase)



module.exports = router