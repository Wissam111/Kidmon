

const buildGetUsersUseCase = (userDb) => {


    return async ({ page, pageSize, search, sort }) => {
        return await userDb.find({ page, pageSize, search, sort })
    }

}



module.exports = { buildGetUsersUseCase }