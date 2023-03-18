const { buildCreateUserUseCase } = require("./create-user")


const makeUserUseCases = async (userRepository) => {
   
    const createUserUseCase = buildCreateUserUseCase(userRepository)


    return {
        createUserUseCase
    }
}


module.exports = {
    makeUserUseCases
}

