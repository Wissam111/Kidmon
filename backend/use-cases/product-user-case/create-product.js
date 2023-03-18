const { makeProduct } = require("../../entities")


const buildCreateProductUseCase = (productRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ price, title, allergicIngredients }) => {
        const product = makeProduct({
            price,
            title,
            allergicIngredients
        })
        
        return await productRepository.create(product)
    }

}



module.exports = { buildCreateProductUseCase }