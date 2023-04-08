const { makeProduct } = require("../../entities")
const { NotFoundError } = require("../../utils/errors")


const buildGetProductsUseCase = ({ productDb }) => {

    return async ({ page, pageSize, sort, search }) => {
        return await productDb.find({ page, pageSize, sort, search })
    }

}



module.exports = { buildGetProductsUseCase }