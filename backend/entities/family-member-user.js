const { ValidationError } = require("../utils/errors");
const { USER_ROLES } = require("./user");


const Allergies = {
    milk: 'Milk',
    eggs: 'Eggs',
    mustard: 'Mustard',
    peanuts: 'Peanuts',
    soy: 'Soy',
    fish: 'Fish'
}
const Allergies_ENUM = Object.values(Allergies)


// TODO: limits 
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
        limits,
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
            if (!Allergies_ENUM.includes(allergy)) {
                throw new ValidationError(`Allergy must be one of the following: ${Allergies}`)
            }
        })

        if (!Id.isValid(parent)) {
            throw new ValidationError(`parent must be a valid id`)
        }

        for (let k in limits) {
            if (limits[k] < 0) {
                throw new ValidationError(`A limit must be greater or equal than 0`)
            }
        }

        // if (limits) {
        //     if (limits.daily > limits.weekly) {
        //         throw new ValidationError(`weekly limit must be greater or equal than daily limit`)
        //     }

        //     if (limits.weekly > limits.monthly) {
        //         throw new ValidationError(`monthly limit must be greater or equal than weekly limit`)
        //     }
        // }

        return Object.freeze({
            ...user,
            braceletId,
            credits,
            allergies,
            parent,
            limits
        })
    }
}



module.exports = Object.freeze({
    buildMakeFamilyMemberUser,
    Allergies,
    Allergies_ENUM
})


