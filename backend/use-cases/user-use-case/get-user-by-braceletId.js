const { NotFoundError } = require("../../utils/errors")


const buildGetUserByBraceletIdUseCase = (userDb) => {


    // no need for transaction because phone is primary key in the database
    return async ({ BraceletId }) => {
        // if phone exsits
        const user = await userDb.findByBraceletId({ id: BraceletId })
        if (!user) {
            throw new NotFoundError(`User with Bracelet Id ${BraceletId} was not found`)
        }
        
        return user
    }

}



module.exports = { buildGetUserByBraceletIdUseCase }