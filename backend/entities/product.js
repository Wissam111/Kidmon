const { ValidationError } = require("../utils/errors");
const { AllergicIngredients } = require("./family-member-user");



const buildMakeProduct = (ID) => {

    return function makeProduct({
        id = ID.makeId(),
        title,
        price,
        allergicIngredients,
        createdAt = new Date(),
        updatedAt = new Date()
    }) {

        if (allergicIngredients)
            allergicIngredients.forEach((element) => {
                if (!AllergicIngredients.includes(element)) {
                    throw ValidationError('allergic ingredient was not found')
                }
            })




        return Object.freeze({
            id,
            title,
            price,
            allergicIngredients,
            createdAt,
            updatedAt
        })
    }
}



module.exports = Object.freeze({
    buildMakeProduct
})


