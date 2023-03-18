const { makeProduct } = require("../../entities")
const { NotFoundError } = require("../../utils/errors")


const buildDeleteProductUseCase = (productRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ productId }) => {
        const product = await productRepository.findById({ id: productId })
        if (!product) {
            throw new NotFoundError('Product not found')
        }
        return await productRepository.delete({ id: productId })
    }

}



module.exports = { buildDeleteProductUseCase }