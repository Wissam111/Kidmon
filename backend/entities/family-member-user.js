const { makeUser } = require(".");
const { ValidationError } = require("../utils/errors");
const { USER_ROLES } = require("./user");


const Allergies = ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']


const buildMakeFamilyMemberUser = () => {

    return function makeParentUser({
        id,
        firstName, // required
        lastName, // required
        phone, // required
        image = null,
        purchaseCardId,
        allergies = [],
        credits = 0,
        createdAt,
        updatedAt
    }) {


        const user = makeUser({
            id,
            firstName, // required
            lastName, // required
            phone, // required
            image,
            role: USER_ROLES.familyMember, // required
            createdAt,
            updatedAt
        })

        if (!purchaseCardId) {
            throw new ValidationError('Family member user must have purchase card id')
        }

        if (credits < 0) {
            throw new ValidationError('credits must be positive number')
        }


        allergies.forEach((allergy) => {
            if (!Allergies.includes(allergy)) {
                throw new ValidationError(`Allergy must be one of the following: ${Allergies}`)
            }
        })



        return Object.freeze({
            ...user,
            purchaseCardId,
            credits,
            allergies,
        })
    }
}



module.exports = Object.freeze({
    buildMakeFamilyMemberUser,
    AllergicIngredients: Allergies
})


