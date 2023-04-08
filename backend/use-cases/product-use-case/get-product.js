const { NotFoundError } = require("../../utils/errors")


const buildGetProductUseCase = ({ productDb }) => {


    // no need for transaction because phone is primary key in the database
    return async ({ productId }) => {
        const product = await productDb.findById({ id: productId })
        if (!product) {
            throw new NotFoundError('Product not found')
        }
        return await productDb.findById({ id: productId })
    }

}



module.exports = { buildGetProductUseCase }