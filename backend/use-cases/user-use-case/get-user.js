const { NotFoundError } = require("../../utils/errors")


const buildDeleteUserUseCase = (userRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ userId }) => {
        // if phone exsits
        const userExsits = await userRepository.findById({ id: userId })
        if (userExsits) {
            new NotFoundError(`User with id ${userId} was not found`)
        }

        return await userRepository.delete({ id: userId })
    }

}



module.exports = { buildDeleteUserUseCase }