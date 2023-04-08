const { makePurchaseActivity, makeFamilyMemberUser } = require("../../entities")
const { ActivityTypes } = require("../../entities/activity")
const { InsufesientFunds, NotFoundError } = require("../../utils/errors")

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

            if (user.credits < finalPrice) {
                throw new InsufesientFunds('Insufesient user funds')
            }


            // update user funds
            const updatedUser = makeFamilyMemberUser({
                ...user,
                credits: user.credits - finalPrice,
                updatedAt: undefined
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