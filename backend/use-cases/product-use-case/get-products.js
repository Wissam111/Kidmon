

const buildGetProductsUseCase = ({ productDb }) => {

    return async ({ search, page, pageSize, sort, category }) => {

        const filters = {}
        if (category) {
            filters.category = category
        }
        const { products, count } = await productDb.find({ search, page, pageSize, sort, filters })
        return { products, count }
    }

}



module.exports = { buildGetProductsUseCase }