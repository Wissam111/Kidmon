const { USER_ROLES } = require("../../entities/user")
const { NotFoundError } = require("../../utils/errors")


const buildRemoveUserUseCase = (userRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ userId }) => {
        // if phone exsits
        const user = await userRepository.findById({ id: userId })
        if (user) {
            new NotFoundError(`User with id ${userId} was not found`)
        }
        if (user.role === USER_ROLES.familyMember) {
            new Error('You cant remove a family member from here')
        }
        return await userRepository.update({ ...user, isActive: false, updateAt: undefined})
    }

}



module.exports = { buildRemoveUserUseCase }