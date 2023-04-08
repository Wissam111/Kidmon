const { ValidationError } = require("../utils/errors");
const { USER_ROLES } = require("./user");


const Allergies = ['Milk', 'Eggs', 'Mustard', 'Peanuts', 'Soy', 'Fish']


const buildMakeFamilyMemberUser = (Id, makeUser) => {

    return ({
        id,
        parent, // required
        braceletId, // required
        firstName, // required
        lastName, // required
        phone, // required
        image = null,
        allergies = [],
        credits = 0,
        createdAt,
        updatedAt
    }) => {


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

        if (!braceletId) {
            throw new ValidationError('Family member user must have braceletId id')
        }

        if (!parent) {
            throw new ValidationError('Family member user must have a parent id')
        }

        if (credits < 0) {
            throw new ValidationError('credits must be positive number')
        }


        allergies.forEach((allergy) => {
            if (!Allergies.includes(allergy)) {
                throw new ValidationError(`Allergy must be one of the following: ${Allergies}`)
            }
        })

        if (!Id.isValid(parent)) {
            throw new ValidationError(`parent must be a valid id`)
        }



        return Object.freeze({
            ...user,
            braceletId,
            credits,
            allergies,
            parent
        })
    }
}



module.exports = Object.freeze({
    buildMakeFamilyMemberUser,
    AllergicIngredients: Allergies
})


