const { makeProduct } = require("../../entities")


const buildCreateProductUseCase = ({ productDb }) => {


    // no need for transaction because phone is primary key in the database
    return async ({ price, title, allergicIngredients, category }) => {
        const product = makeProduct({
            price,
            title,
            category,
            allergicIngredients
        })

        return await productDb.create(product)
    }

}



module.exports = { buildCreateProductUseCase }