const createProduct = require("./create-product");
const deleteProduct = require("./delete-product");
const getProduct = require("./get-product");
const getProducts = require("./get-products");


module.exports = {
    '/products': {
        ...createProduct,
        ...getProducts
    },

    '/products/{id}': {
        ...deleteProduct,
        ...getProduct,
    },


}