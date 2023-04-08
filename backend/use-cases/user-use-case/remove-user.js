const { NotFoundError } = require("../../utils/errors")


const buildRemoveUserUseCase = (userRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ userId }) => {
        // if phone exsits
        const userExsits = await userRepository.findById({ id: userId })
        if (userExsits) {
            new NotFoundError(`User with id ${userId} was not found`)
        }

        return await userRepository.remove({ id: userId })
    }

}



module.exports = { buildRemoveUserUseCase }