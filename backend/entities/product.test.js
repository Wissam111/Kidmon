const { makeProduct } = require(".");
const { Allergies } = require("./family-member-user");
const { PRODUCT_CATEGORIES } = require("./product");




describe('making product', () => {

    test('should make product', () => {
        const product = makeProduct({
            title: 'XL',
            price: 100,
            category: PRODUCT_CATEGORIES.cold,
            allergicIngredients: [Allergies.eggs, Allergies.fish]
        })

        expect(product).toBeDefined()
        expect(product.title).toBe('XL')
        expect(product.price).toBe(100)
        expect(product.category).toBe(PRODUCT_CATEGORIES.cold)
        expect(product.allergicIngredients).toEqual([Allergies.eggs, Allergies.fish])

        expect(product.createdAt).toBeDefined()
        expect(product.updatedAt).toBeDefined()
    })



    test('should throw title is required', () => {
        expect(
            () => {
                makeProduct({
                    price: 100,
                    category: PRODUCT_CATEGORIES.cold,
                    allergicIngredients: [Allergies.eggs, Allergies.fish]
                })
            }).toThrow('Product must have a title')
    })


    test('should throw price error', () => {
        expect(
            () => {
                makeProduct({
                    title: 'XL',
                    category: PRODUCT_CATEGORIES.cold,
                    allergicIngredients: [Allergies.eggs, Allergies.fish]
                })
            }).toThrow('Product must have a price')


        expect(
            () => {
                makeProduct({
                    title: 'XL',
                    price: -100,
                    category: PRODUCT_CATEGORIES.cold,
                    allergicIngredients: [Allergies.eggs, Allergies.fish]
                })
            }).toThrow('price must be a positive number')


        expect(
            () => {
                makeProduct({
                    title: 'XL',
                    price: 101,
                    category: PRODUCT_CATEGORIES.cold,
                    allergicIngredients: [Allergies.eggs, Allergies.fish]
                })
            }).toThrow('price must be below 100')
    })


    test('should throw wrong category', () => {
        expect(
            () => {
                makeProduct({
                    title: 'XL',
                    price: 100,
                    category: 'aaa',
                    allergicIngredients: [Allergies.eggs, Allergies.fish]
                })
            }).toThrow('the category aaa is invalid')
    })

    test('should throw wrong category', () => {
        expect(
            () => {
                makeProduct({
                    title: 'XL',
                    price: 100,
                    category: PRODUCT_CATEGORIES.cold,
                    allergicIngredients: [Allergies.eggs, 'bbbb']
                })
            }).toThrow('allergic ingredient was not found')
    })


});