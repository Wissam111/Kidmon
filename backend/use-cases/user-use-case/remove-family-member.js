const { makeParentUser } = require("../../entities")
const { NotFoundError } = require("../../utils/errors")


const buildRemoveFamilyMemberUseCase = ({ userDb }) => {

    return async ({ familyMemberId }) => {
        const transaction = await userDb.makeTransaction()
        await transaction.startTransaction()

        try {
            const familyMember = await userDb.findById({ id: familyMemberId, transaction, populate: false })
            if (familyMember) {
                new NotFoundError(`Family member with id ${familyMemberId} was not found`)
            }
            const parent = await userDb.findById({ id: familyMember.parent, transaction, populate: false })

            const updatedParent = makeParentUser({
                ...parent,
                familyMembers: parent.familyMembers.filter(memberId => memberId !== familyMemberId),
                updateAt: undefined
            })
            await userDb.update({ ...updatedParent, transaction })

            await userDb.remove({ id: familyMemberId, transaction })
            await transaction.commitTransaction()
        }
        catch (error) {
            await transaction.abortTransaction()
            throw error

        } finally {
            await transaction.endTransaction()
        }

    }

}



module.exports = { buildRemoveFamilyMemberUseCase }