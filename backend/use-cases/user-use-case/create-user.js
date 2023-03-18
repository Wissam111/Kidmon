const { makeUser } = require("../../entities")
const { CausesEnum, CustomError } = require("../../utils/Error")


const buildCreateUserUseCase = (userRepository) => {


    // no need for transaction because phone is primary key in the database
    return async ({ firstName, lastName, phone, image, role }) => {

        // if phone exsits
        const phoneExsits = await userRepository.findByPhone({ phone: phone })
        if (phoneExsits) {
            new CustomError('Phone already exists', CausesEnum.alreadyExists)
        }

        
        const user = makeUser({ firstName, lastName, phone, image, role })
        
        return await userRepository.create(user)
    }

}



module.exports = { buildCreateUserUseCase }