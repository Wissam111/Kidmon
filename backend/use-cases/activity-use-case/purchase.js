const { makePurchaseActivity, makeFamilyMemberUser } = require("../../entities")
const { ActivityTypes } = require("../../entities/activity")
const { InsufesientFunds, NotFoundError, CreditsLimitError } = require("../../utils/errors")

/**
 *  items :[
 *       {
 *          id: 'sdfxcvdfbdvsdfasdfwqef',
 *          amount: '20'
 *       }
 * 
 * ]
 * 
 * 
 */

const buildPurchaseUseCase = ({ userDb, activityDb, productDb }) => {

    return async ({ userId, items }) => {
        let finalPrice = 0
        // calculate final purchase price
        items.forEach(async item => {
            // find item
            // add its price * amount  
            const p = await productDb.findById({ id: item.id })
            if (!p) {
                throw new NotFoundError('Item not found')
            }
            finalPrice += p.price * item.amount
        })


        const transaction = await userDb.makeTransaction()
        await transaction.startTransaction()



        try {

            const user = await userDb.findById({ id: userId, populate: false, transaction })
            if (!user) {
                throw new NotFoundError('User not found')
            }

            // subject to credits limit
            if (user.limits && user.limits.daily < finalPrice) {
                throw new CreditsLimitError('Daily limit reached')
            }

            if (user.limits && user.limits.weekly < finalPrice) {
                throw new CreditsLimitError('Weekly limit reached')
            }

            if (user.limits && user.limits.monthly < finalPrice) {
                throw new CreditsLimitError('Monthly limit reached')
            }

            // update limits
            const limits = user.limits ? {
                daily: user.limits.daily - finalPrice,
                weekly: user.limits.weekly - finalPrice,
                monthly: user.limits.monthly - finalPrice
            } : undefined

            // have sufficient credits
            if (user.credits < finalPrice) {
                throw new InsufesientFunds('Insufesient user funds')
            }


            // update user funds
            const updatedUser = makeFamilyMemberUser({
                ...user,
                credits: user.credits - finalPrice,
                updatedAt: undefined,
                limits
            })
            await userDb.update({ ...updatedUser, transaction })



            const activity = makePurchaseActivity({
                price: finalPrice,
                items: items,
                user: userId,
            })

            await activityDb.create({ ...activity, transaction: transaction })

            await transaction.commitTransaction()

        } catch (error) {
            await transaction.abortTransaction()
            throw error

        } finally {
            await transaction.endTransaction()
        }
    }

}




module.exports = {
    buildPurchaseUseCase
} 