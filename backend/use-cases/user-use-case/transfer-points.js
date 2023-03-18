import { makeActivity, makeTransactionActivity } from "../../entities"
import { ActivityTypes } from "../../entities/activity"
import { InsufesientFunds, NotFoundError } from "../../utils/errors"



const makeTransferPointsUserUseCase = (userRepository, activityRepository) => {

    return async (actorUser, userId, amount) => {

        const transaction = await userRepository.makeTransaction()
        await transaction.startTransaction()


        const reciverUser = await userRepository.findById({ id: userId, transaction: transaction })
        if (!reciverUser) {
            throw new NotFoundError("User not found")
        }


        // check if there is sufient funds to transfer
        if (actorUser.credits < amount) {
            throw new InsufesientFunds('Insufesient creidts')
        }



        try {
            // update sender
            const updatedActor = makeUser({
                ...actorUser,
                credits: actorUser.credits - amount
            })
            await userRepository.update({ ...updatedActor, transaction: transaction })


            // update reciver
            const updatedReciver = makeUser({
                ...reciverUser,
                credits: reciverUser.credits + amount
            })
            await userRepository.update({ ...updatedReciver, transaction })


            const activity = makeTransactionActivity({
                type: ActivityTypes.transaction,
                from: actorUser.id,
                to: reciverUser.id,
                amount: amount
            })

            await activityRepository.create({ ...activity, transaction: transaction })

            await transaction.commitTransaction()

        } catch (error) {
            await transaction.abortTransaction()

        } finally {
            await transaction.endTransaction()
        }
    }

}



export default makeTransferPointsUserUseCase