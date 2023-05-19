const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { productController } = require('../../controllers')
const { imageUpload } = require('../middleware/image-file-uploader')
const { requireAuthentication } = require('../middleware/requireAuthentication')
const { makeRoleAuthorization, makeFieldAuthorization } = require('../middleware/requireAuthorization')
const { USER_ROLES } = require('../../entities/user')


const router = Router()



router.get('/:productId',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            productId: Joi.string().required(),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
    productController.getProduct)



router.get('/',
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
            pageSize: Joi.number(),
            sort: Joi.string(),
            search: Joi.string(),
            category: Joi.string(),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
    productController.getProducts)



router.post('/',
    imageUpload('image'),
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            allergicIngredients: Joi.array().items(Joi.string()),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
    productController.createProduct)



router.delete('/:productId',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            productId: Joi.string().required(),
        })
    }),
    requireAuthentication,
    makeRoleAuthorization({ userRoles: [USER_ROLES.admin] }),
    productController.deleteProduct)


module.exports = router