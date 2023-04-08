const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { productController } = require('../../controllers')


const router = Router()



router.get('/:productId',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            productId: Joi.string().required(),
        })
    }),
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
    productController.getProducts)



router.post('/',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            price: Joi.number().required(),
            category: Joi.string().required(),
            allergicIngredients: Joi.array().items(Joi.string()),
        })
    }),
    productController.createProduct)



router.delete('/:productId',
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            productId: Joi.string().required(),
        })
    }),
    productController.deleteProduct)


module.exports = router