const { NotFoundError } = require("../../utils/errors")


const buildDeleteProductUseCase = ({ productDb }) => {


    return async ({ productId }) => {
        const product = await productDb.findById({ id: productId })
        if (!product) {
            throw new NotFoundError('Product not found')
        }
        return await productDb.remove({ id: productId })
    }

}



module.exports = { buildDeleteProductUseCase }