const { ValidationError } = require("../utils/errors");
const { USER_ROLES } = require("./user");


const Limits = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly'
}

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
            throw new ValidationError(`parent must have a valid id`)
        }


        /**
         *  limits: {
         *     weekly:{isActive: false}
         *     monthly:{isActive: true}
         *     yearly:{isActive: false}
         *  }
         */
        for (let k in limits) {
            if (k == 'isActive') continue

            if (limits[k].value < 0) {
                throw new ValidationError(`A limit must be greater or equal than 0`)
            }

            if (limits[k].current && limits[k].current < 0) {
                throw new ValidationError(`current limit must be greater or equal than 0`)
            }

            if (limits.isActive && limits[k].isActive && limits[k].value < limits[k].current) {
                throw new ValidationError(`A limit current must be lest or equal to the value`)
            }

            if (!limits[k].current) {
                limits[k].current = 0
            }
        }

        if (!limits)
            limits = {
                isActive: false
            }

        limits.daily = limits.daily || { value: 0, current: 0, isActive: false }
        limits.weekly = limits.weekly || { value: 0, current: 0, isActive: false }
        limits.monthly = limits.monthly || { value: 0, current: 0, isActive: false }

        limits.isActive = limits.isActive || false

        return Object.freeze({
            ...user,
            braceletId,
            credits,
            allergies: [...new Set(allergies)],
            parent,
            limits
        })
    }
}



module.exports = Object.freeze({
    buildMakeFamilyMemberUser,
    Allergies,
    Allergies_ENUM,
    Limits
})


