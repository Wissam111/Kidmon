const { ValidationError } = require("../utils/errors");
const { USER_ROLES } = require("./user");



const buildMakeParentUser = (ID, makeUser) => {

    return ({
        id,
        firstName, // required
        lastName, // required
        phone, // required
        image = null,
        familyMembers = [],
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
            role: USER_ROLES.parent, // required
            createdAt,
            updatedAt
        })


        if (credits < 0) {
            throw new ValidationError('credits must be positive number')
        }


        familyMembers.forEach((member) => {
            if (!ID.isValid(member)) {
                throw new ValidationError('family members must have valid id\'s')
            }
        })

        return Object.freeze({
            ...user,
            familyMembers,
            credits,
        })
    }
}



module.exports = Object.freeze({
    buildMakeParentUser,
})


