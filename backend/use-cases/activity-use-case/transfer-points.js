const { makeTransactionActivity, makeParentUser, makeFamilyMemberUser } = require("../../entities")
const { USER_ROLES } = require("../../entities/user")
const { InsufesientFunds, NotFoundError, UserRoleError } = require("../../utils/errors")



const buildTransferPointsUserUseCase = ({ userDb, activityDb }) => {

    return async ({ senderUserId, receiverUserId, amount }) => {

        const transaction = await userDb.makeTransaction()
        await transaction.startTransaction()


        const senderUser = await userDb.findById({ id: senderUserId, populate: false, transaction: transaction })
        if (!senderUser) {
            throw new NotFoundError("sender user not found")
        }

        if (senderUser.role !== USER_ROLES.parent) {
            throw new UserRoleError(`sender must have a ${USER_ROLES.parent} role`)
        }


        const receiverUser = await userDb.findById({ id: receiverUserId, populate: false, transaction: transaction })
        if (!receiverUser) {
            throw new NotFoundError("reciver user not found")
        }

        // check if the receiver is a family member of the sender
        if (receiverUser.parent !== senderUser.id) {
            throw new UserRoleError(`receiver must be a family member of the sender`)
        }

        if (receiverUser.role !== USER_ROLES.familyMember) {
            throw new UserRoleError(`receiver must have a ${USER_ROLES.familyMember} role`)
        }


        // check if there is sufient funds to transfer
        if (senderUser.credits < amount) {
            throw new InsufesientFunds('Insufesient creidts')
        }



        try {
            // update sender
            const updatedSender = makeParentUser({
                ...senderUser,
                credits: senderUser.credits - amount,
                updatedAt: undefined
            })
            await userDb.update({ ...updatedSender, transaction: transaction })
            console.log(updatedSender);

            // update receiver
            const updatedReceiver = makeFamilyMemberUser({
                ...receiverUser,
                credits: receiverUser.credits + amount,
                updatedAt: undefined
            })
            await userDb.update({ ...updatedReceiver, transaction })


            const activity = makeTransactionActivity({
                from: senderUser.id,
                to: updatedReceiver.id,
                amount: amount
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
    buildTransferPointsUserUseCase
} 