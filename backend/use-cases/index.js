const { makeRepositories } = require("../data-access/mongodb")
const { makeUserUseCases } = require("./user-use-case")



const useCases = async () => {

    const { userRepository } = await makeRepositories()
    const userUseCases = await makeUserUseCases(userRepository)


    
    return {
        userUseCases: { ...userUseCases }
    }
}


module.exports = {
    useCases
}