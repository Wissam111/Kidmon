

const buildGetProductsUseCase = ({ productDb }) => {

    return async ({ search, page, pageSize, sort, category }) => {

        const filters = {}
        if (category) {
            filters.category = category
        }

        return await productDb.find({ search, page, pageSize, sort, filters })
    }

}



module.exports = { buildGetProductsUseCase }