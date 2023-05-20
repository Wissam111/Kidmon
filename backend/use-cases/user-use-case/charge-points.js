const { makeParentUser } = require("../../entities")
const { USER_ROLES } = require("../../entities/user")
const { NotFoundError, UserRoleError } = require("../../utils/errors")


const buildChargePointsUseCase = ({ userDb }) => {
    return async ({ userId, points }) => {

        const transaction = await userDb.makeTransaction()
        await transaction.startTransaction()

        try {
            const user = await userDb.findById({ id: userId })
            if (!user) {
                throw new NotFoundError('User not found')
            }
            if (user.role !== USER_ROLES.parent) {
                throw new UserRoleError('Only parents users are allowed')
            }


            const updatedUser = await userDb.update({
                ...makeParentUser({
                    ...user,
                    credits: user.credits + points,
                    updatedAt: undefined
                }), transaction
            })

            return updatedUser
        }
        catch (error) {
            await transaction.abortTransaction()
            throw error

        } finally {
            await transaction.endTransaction()
        }
    }
}

module.exports = {
    buildChargePointsUseCase
}