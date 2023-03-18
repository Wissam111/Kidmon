const { ValidateCharsOnly } = require('../validators/ValidateCharsOnly')
const { ValidateNumbersOnly } = require('../validators/ValidateNumbersOnly')
const { buildMakeUser } = require('./user')
const { createId, isCuid } = require('@paralleldrive/cuid2')



const IdGenerator = {
    makeId: createId,
    isValid: isCuid
}



const makeUser = buildMakeUser(IdGenerator, ValidateCharsOnly, ValidateNumbersOnly)


module.exports = {
    makeUser,
}

