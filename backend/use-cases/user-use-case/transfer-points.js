


const makeTransferPointsUserUseCase = (userRepository) => {

    return async (actorUser, userId, amount) => {

        const reciverUser = await userRepository.findById(userId)
        if (!reciverUser) {
            throw new CustomError("User not found", CausesEnum.notFound)
        }


        // check if there is sufient funds to transfer
        if (actorUser.credits < amount) {
            throw new CustomError("Insufesient creidts", "")
        }

        const transaction = await userRepository.makeTransaction()

        await transaction.startTransaction()

        try {
            // update sender
            const updatedActor = makeUser({
                ...actorUser,
                credits: actorUser.credits - amount
            })
            await userRepository.update({ id: actorUser.id, updatedData: updatedActor } , transaction)


            // update reciver
            const updatedReciver = makeUser({
                ...reciverUser,
                credits: reciverUser.credits + amount
            })
            await userRepository.update({ id: reciverUser.id, updatedData: updatedReciver } , transaction)

            await transaction.commitTransaction()

        } catch (error) {
            await transaction.abortTransaction()

        } finally {
            await transaction.endTransaction()
        }
    }

}



export default makeTransferPointsUserUseCase