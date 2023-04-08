const { makeUser } = require("../../entities")
const { USER_ROLES } = require("../../entities/user")
const { AlreadyExistsError } = require("../../utils/errors")

const buildCreateAdminUserUseCase = (userDb) => {
    // no need for transaction because phone is primary key in the database
    return async ({ firstName, lastName, phone, image }) => {

        // check if phone exsits
        const phoneExsits = await userDb.findByPhone({ phone: phone })
        if (phoneExsits) {
            throw new AlreadyExistsError('Phone already exists')
        }

        user = makeUser({ firstName, lastName, phone, role: USER_ROLES.admin, image })
        return await userDb.create(user)
    }

}



module.exports = { buildCreateAdminUserUseCase }