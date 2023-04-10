const { NotFoundError } = require("../../utils/errors")


const buildGetUserUseCase = (userDb) => {


    // no need for transaction because phone is primary key in the database
    return async ({ userId }) => {
        // if phone exsits
        const user = await userDb.findById({ id: userId })
        if (!user) {
            throw new NotFoundError(`User with id ${userId} was not found`)
        }
        
        return user
    }

}



module.exports = { buildGetUserUseCase }