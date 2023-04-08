const { Router } = require('express')
const { celebrate, Joi, Segments } = require('celebrate')
const { productController } = require('../../controllers')


const router = Router()


router.get('/:productId', productController.getProduct)

router.get('/', productController.getProducts)

router.post('/', productController.createProduct)

router.delete('/:productId', productController.deleteProduct)


module.exports = router