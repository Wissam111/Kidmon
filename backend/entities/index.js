const { ValidateCharsOnly } = require('../validators/ValidateCharsOnly')
const { ValidateNumbersOnly } = require('../validators/ValidateNumbersOnly')
const { buildMakeActivity } = require('./activity')
const { buildMakeFamilyMemberUser } = require('./family-member-user')
const { buildMakeParentUser } = require('./parent-user')
const { buildMakeProduct } = require('./product')
const { buildMakePurchaseActivity } = require('./purchace-activity')
const { buildMakeTransactionActivity } = require('./transaction-activity')
const { buildMakeUser } = require('./user')
const { createId, isCuid } = require('@paralleldrive/cuid2')



const IdGenerator = {
    makeId: createId,
    isValid: isCuid
}



const makeUser = buildMakeUser(IdGenerator, ValidateCharsOnly, ValidateNumbersOnly)
const makeParentUser = buildMakeParentUser(IdGenerator)
const makeFamilyMemberUser = buildMakeFamilyMemberUser()


const makeActivity = buildMakeActivity()
const makeTransactionActivity = buildMakeTransactionActivity()
const makePurchaseActivity = buildMakePurchaseActivity()

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

