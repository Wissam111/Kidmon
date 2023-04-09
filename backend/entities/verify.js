const { ValidationError } = require("../utils/errors")



const buildMakeVerify = (ID, ValidateNumbersOnly) => {

    return function makeUser({
        id = ID.makeId(),
        code,
        phone
    }) {
        if (!ID.isValid(id)) {
            throw new ValidationError('Verify must have a valid id')
        }

        if (!phone) {
            throw new ValidationError('Verify must have a phone number')
        }

        if (!code) {
            throw new ValidationError('Verify must have a code')
        }

        if (!ValidateNumbersOnly.isValid(phone)) {
            throw new ValidationError('Verify must have valid phone')
        }

        if (phone.length < 6 || phone.length > 12) {
            throw new ValidationError('phone must be 6 to 12 chars')
        }

        return Object.freeze({
            id: id,
            code: code,
            phone: phone
        })
    }
}


module.exports = {
    buildMakeVerify
}