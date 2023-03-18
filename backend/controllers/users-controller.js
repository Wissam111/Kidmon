
const { makeUserUseCases } = require('../use-cases/user-use-case')


module.exports = async () => {

    const userUseCases = await makeUserUseCases()


    const createUser = async (req, res) => {
        try {
            console.log('creating a user');
            const user = await userUseCases.createUserUseCase({ firstName: 'tarik', lastName: 'husin', phone: '0525145565', role: 'admin' })
            res.status(201).json(user)

        } catch (e) {
            console.log(e);
        }
    }





    return {
        createUser
    }
}


