const { productDb } = require("../../data-access/mongodb");
const { buildCreateProductUseCase } = require("./create-product");
const { buildDeleteProductUseCase } = require("./delete-product");
const { buildGetProductUseCase } = require("./get-product");
const { buildGetProductsUseCase } = require("./get-products");



const createProduct = buildCreateProductUseCase({ productDb })
const deleteProduct = buildDeleteProductUseCase({ productDb })
const getProduct = buildGetProductUseCase({ productDb })
const getProducts = buildGetProductsUseCase({ productDb })


module.exports = Object.freeze({
    createProduct,
    deleteProduct,
    getProduct,
    getProducts
})