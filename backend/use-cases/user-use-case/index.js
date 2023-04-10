const { userDb } = require("../../data-access/mongodb")
const { buildCreateFamilyMemberUserUseCase } = require("./create-family-member-user")
const { buildCreateParentUserUseCase } = require("./create-parent-user")
const { buildCreateAdminUserUseCase } = require("./create-user-admin")
const { buildGetUserUseCase } = require("./get-user")
const { buildGetUserByBraceletIdUseCase } = require("./get-user-by-braceletId")





const createAdminUserUseCase = buildCreateAdminUserUseCase(userDb)
const createFamilyMemberUserUseCase = buildCreateFamilyMemberUserUseCase(userDb)
const createParentUserUseCase = buildCreateParentUserUseCase(userDb)

const getUserUseCase = buildGetUserUseCase(userDb)
const getUserByBraceletIdUseCase = buildGetUserByBraceletIdUseCase(userDb)


module.exports = Object.freeze({
    createAdminUserUseCase,
    createFamilyMemberUserUseCase,
    createParentUserUseCase,
    getUserUseCase,
    getUserByBraceletIdUseCase
})
