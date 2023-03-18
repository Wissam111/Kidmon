const { makeUser, makeFamilyMemberUser, makeParentUser } = require("../../entities")
const { USER_ROLES } = require("../../entities/user")
const { AlreadyExistsError } = require("../../utils/errors")


const buildCreateUserUseCase = (userRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ firstName, lastName, phone, image, role, purchaseCardId }) => {

        // if phone exsits
        const phoneExsits = await userRepository.findByPhone({ phone: phone })
        if (phoneExsits) {
            new AlreadyExistsError('Phone already exists')
        }

        let user
        if (role === USER_ROLES.admin) {
            user = makeUser({ firstName, lastName, phone, role , image })
        }
        else if (role === USER_ROLES.familyMember) {
            user = makeFamilyMemberUser({ firstName, lastName, phone, image, purchaseCardId })
        }
        else {
            user = makeParentUser({ firstName, lastName, phone, image })
        }

        return await userRepository.create(user)
    }

}



module.exports = { buildCreateUserUseCase }