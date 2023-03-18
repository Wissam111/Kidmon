const { ValidationError } = require("../error/Validation-Error");

const USER_ROLES = Object.freeze({
    parent: 'parent',
    familyMember: 'family-memeber',
    admin: 'admin'
})

const USER_ROLES_ENUM = Object.values(USER_ROLES)

const buildMakeUser = (ID, ValidateCharsOnly, ValidateNumbersOnly) => {

    return function makeUser({
        id = ID.makeId(),
        firstName, // required
        lastName, // required
        phone, // required
        image = null,
        familyMembers = [],
        credits = 0,
        role, // required
        createdAt = new Date(),
        updatedAt = new Date()
    }) {

        if (!ID.isValid(id)) {
            throw new ValidationError('User must have a valid ID');
        }


        // required
        if (!firstName) {
            throw new ValidationError('User must have a firstName')
        }

        if (!lastName) {
            throw new ValidationError('User must have a lastName')
        }

        if (!phone) {
            throw new ValidationError('User must have a phone')
        }

        if (!role) {
            throw new ValidationError('User must have a role')
        }


        // matching regex
        if (!ValidateCharsOnly.isValid(firstName)) {
            throw new ValidationError('firstName must contains characters only seperated by space')
        }

        if (!ValidateCharsOnly.isValid(lastName)) {
            throw new ValidationError('lastName must contains characters only seperated by space')
        }

        if (!ValidateNumbersOnly.isValid(phone)) {
            throw new ValidationError('phone must be numbers only')
        }



        // length 
        if (firstName.length < 2 || firstName.length > 20) {
            throw new ValidationError('firstName must be 2 to 20 chars')
        }

        if (lastName.length < 2 || lastName.length > 20) {
            throw new ValidationError('lastName must be 2 to 20 chars')
        }

        if (phone.length < 6 || phone.length > 12) {
            throw new ValidationError('phone must be 6 to 12 chars')
        }


        if (credits < 0) {
            throw new ValidationError('credits must be positive number')
        }

        familyMembers.forEach((member) => {
            if (!ID.isValid(member)) {
                throw new ValidationError('family members must have valid id\'s')
            }
        })


        // check enums
        if (!USER_ROLES_ENUM.includes(role)) {
            throw new ValidationError('role must be either parent, family-memeber or an admin')
        }



        return Object.freeze({
            id,
            firstName,
            lastName,
            phone,
            image,
            familyMembers,
            credits,
            role,
            updatedAt,
            createdAt
        })
    }
}



module.exports = Object.freeze({
    buildMakeUser,
    USER_ROLES_ENUM
})



