const { makeUser, makeParentUser, makeFamilyMemberUser } = require("../../entities");
const { USER_ROLES } = require("../../entities/user");
const { NotFoundError } = require("../../utils/errors");


exports.buildEditUserUseCase = ({ userDb }) => {

    return async ({ userId, ...updateInfo }) => {

        const user = await userDb.findById({ id: userId, populate: false })

        if (!user) {
            throw new NotFoundError('User not found');
        }

        const onlyDefiendInfos = {}
        for (const info in updateInfo) {
            if (updateInfo[info] !== undefined) {
                onlyDefiendInfos[info] = updateInfo[info]
            }
        }

        let updatedUser
        // upadte the user
        if (user.role === USER_ROLES.admin) {
            updatedUser = makeUser({
                ...user,
                ...onlyDefiendInfos,
                updatedAt: undefined
            })
        }
        else if (user.role === USER_ROLES.parent) {
            updatedUser = makeParentUser({
                ...user,
                ...onlyDefiendInfos,
                updatedAt: undefined
            })
        }
        else if (user.role === USER_ROLES.familyMember) {
            updatedUser = makeFamilyMemberUser({
                ...user,
                ...onlyDefiendInfos,
                updatedAt: undefined
            })
        }

        return await userDb.update(updatedUser)
    }
}