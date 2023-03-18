import { makeActivity, makeFamilyMemberUser, makeTransactionActivity } from "../../entities"
import { ActivityTypes } from "../../entities/activity"
import { InsufesientFunds, NotFoundError } from "../../utils/errors"

/**
 *  items :[
 *       {
 *          itemId: 'sdfxcvdfbdvsdfasdfwqef',
 *          amount: '20'
 *       }
 * 
 * ]
 * 
 * 
 */

const makePurchaseUseCase = (userRepository, activityRepository, productRepository) => {

    return async ({ userId, items }) => {

        try {

            let finalPrice = 0
            // calculate final purchase price
            items.forEach(async item => {
                // find item
                // add its price * amount  
                const item = await productRepository.findById(item.id)
                if(!item){
                    throw NotFoundError('Item not found')
                }
                finalPrice += item.price * item.amount
            })



            const transaction = await userRepository.makeTransaction()
            await transaction.startTransaction()

            const user = await userRepository.findById({ id: userId, transaction })
            if (!user) {
                throw new NotFoundError('User not found')
            }

            if (user.credits < finalPrice) {
                throw new InsufesientFunds('Insufesient user funds')
            }



            // update user funds
            const updatedUser = makeFamilyMemberUser({
                ...user,
                credits: reciverUser.credits - finalPrice
            })
            await userRepository.update({ ...updatedUser, transaction })



            const activity = makeTransactionActivity({
                type: ActivityTypes.purchase,
                from: actorUser.id,
                to: reciverUser.id,
                amount: amount
            })

            await activityRepository.create({ ...activity, transaction: transaction })

            await transaction.commitTransaction()

        } catch (error) {
            await transaction.abortTransaction()
            throw error

        } finally {
            await transaction.endTransaction()
        }
    }

}



export default makeTransferPointsUserUseCase