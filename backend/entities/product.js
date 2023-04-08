const { ValidationError } = require("../utils/errors");
const { AllergicIngredients } = require("./family-member-user");

const CATEGORIES = Object.freeze({
    snack: 'Snack',
    cold: 'Cold',
    hot: 'Hot',
    food: 'Food'
})

const CATEGORIES_ENUM = Object.values(CATEGORIES)


const buildMakeProduct = (ID) => {

    return function makeProduct({
        id = ID.makeId(),
        title,
        price,
        image,
        category,
        allergicIngredients,
        createdAt = new Date(),
        updatedAt = new Date()
    }) {

        if (!title) {
            throw new ValidationError('Product must have a title')
        }

        if (!price) {
            throw new ValidationError('Product must have a price')
        }

        if (!category) {
            throw new ValidationError(`Product must have a category of ${CATEGORIES_ENUM}`)
        }

        //TODO: remove duplication in the array
        if (allergicIngredients)
            allergicIngredients.forEach((element) => {
                if (!AllergicIngredients.includes(element)) {
                    throw new ValidationError('allergic ingredient was not found')
                }
            })



        if (!CATEGORIES_ENUM.includes(category)) {
            throw new ValidationError(`the category ${category} is invalid`)
        }

        if (price < 0) {
            throw new ValidationError(`price must be a positive number`)
        }

        if (price > 100) {
            throw new ValidationError(`price must be below 100`)
        }


        return Object.freeze({
            id,
            title,
            price,
            image,
            category,
            allergicIngredients,
            createdAt,
            updatedAt
        })
    }
}



module.exports = Object.freeze({
    buildMakeProduct
})


