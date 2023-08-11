const { fakeProductDb } = require("../../../data-access/fakedb");
const { PRODUCT_CATEGORIES } = require("../../../entities/product");
const { NotFoundError } = require("../../../utils/errors");
const { buildCreateProductUseCase } = require("../create-product");
const { buildDeleteProductUseCase } = require("../delete-product");
const { buildGetProductUseCase } = require("../get-product");



const createProduct = buildCreateProductUseCase({ productDb: fakeProductDb })
const deleteProduct = buildDeleteProductUseCase({ productDb: fakeProductDb })
const getProduct = buildGetProductUseCase({ productDb: fakeProductDb })



describe('', () => {


    it('should create a product', async () => {

        let product = await createProduct({ price: 20, title: 'Dortos', category: PRODUCT_CATEGORIES.hot })

        expect(product).toBeDefined()
        expect(product.title).toBe('Dortos')
        expect(product.price).toBe(20)
        expect(product.category).toBe(PRODUCT_CATEGORIES.hot)
        expect(product.id).toBeDefined()

        product = await getProduct({ productId: product.id })
        expect(product).toBeDefined()
        expect(product.title).toBe('Dortos')
        expect(product.price).toBe(20)
        expect(product.category).toBe(PRODUCT_CATEGORIES.hot)
        expect(product.id).toBeDefined()
    })


    it('should delete a product', async () => {

        let product = await createProduct({ price: 20, title: 'Dortos', category: PRODUCT_CATEGORIES.hot })

        expect(product).toBeDefined()

        await deleteProduct({ productId: product.id })

        expect(async () => await getProduct({ productId: product.id })).rejects.toEqual(new NotFoundError('Product not found'))
    })
})