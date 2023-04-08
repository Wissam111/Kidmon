const { ValidateCharsOnly } = require('../validators/ValidateCharsOnly')
const { ValidateNumbersOnly } = require('../validators/ValidateNumbersOnly')
const { buildMakeUser } = require('./user')
const { buildMakeFamilyMemberUser } = require('./family-member-user')
const { buildMakeParentUser } = require('./parent-user')
const { buildMakeActivity } = require('./activity')
const { buildMakeProduct } = require('./product')
const { buildMakePurchaseActivity } = require('./purchace-activity')
const { buildMakeTransactionActivity } = require('./transaction-activity')
const { createId, isCuid } = require('@paralleldrive/cuid2')



const IdGenerator = {
    makeId: createId,
    isValid: isCuid
}


// users builders 
const makeUser = buildMakeUser(IdGenerator, ValidateCharsOnly, ValidateNumbersOnly)
const makeParentUser = buildMakeParentUser(IdGenerator, makeUser)
const makeFamilyMemberUser = buildMakeFamilyMemberUser(IdGenerator, makeUser)


const makeActivity = buildMakeActivity()
const makeTransactionActivity = buildMakeTransactionActivity(makeActivity)
const makePurchaseActivity = buildMakePurchaseActivity(makeActivity)

const makeProduct = buildMakeProduct(IdGenerator)

module.exports = {
    makeUser,
    makeParentUser,
    makeFamilyMemberUser,
    makeActivity,
    makeTransactionActivity,
    makePurchaseActivity,
    makeProduct
}

