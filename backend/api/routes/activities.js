const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { activityController } = require('../../controllers')
const { USER_ROLES } = require('../../entities/user')
const { makeFieldAuthorization, makeRoleAuthorization, makeParentAuthorization } = require('../middleware/requireAuthorization')
const { requireAuthentication } = require('../middleware/requireAuthentication')


const router = Router()



router.get('/',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            type: Joi.string().allow(null),
            page: Joi.number().allow(null),
            pageSize: Joi.number().allow(null),
            sort: Joi.string().valid("desc", "asc").allow(null),
        }).allow(null)
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
    activityController.getActivites)



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
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember, USER_ROLES.parent] }),
    makeParentAuthorization({ reqData: { in: 'query', field: 'userId' }, onlyParent: false }),
    activityController.getUserActivities)


router.post('/user-spendings',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            userId: Joi.string().required(),
            startDate: Joi.string().required(),
            endDate: Joi.string().required()
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember, USER_ROLES.parent] }),
    makeParentAuthorization({ reqData: { in: 'query', field: 'userId' }, onlyParent: false }),
    activityController.getUserSpendings)



router.post('/user-spending',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            userId: Joi.string().required(),
            date: Joi.string().required()
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.familyMember, USER_ROLES.parent] }),
    makeParentAuthorization({ reqData: { in: 'query', field: 'userId' }, onlyParent: false }),
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
    makeParentAuthorization({ reqData: { in: 'body', field: 'receiverUserId' } }),
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