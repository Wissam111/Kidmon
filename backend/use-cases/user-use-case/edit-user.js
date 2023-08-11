const { makeUser, makeParentUser, makeFamilyMemberUser } = require("../../entities");
const { USER_ROLES } = require("../../entities/user");
const { NotFoundError, ValidationError } = require("../../utils/errors");


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
            // if the limits were active and keeping them active the current doesn't change
            // if the limits were not active 

            if (user.limits.isActive && onlyDefiendInfos.limits) {
                for (const limit in onlyDefiendInfos.limits) {
                    const current = user.limits[limit].current
                    onlyDefiendInfos.limits[limit].current = current
                    
                    if(limit.value < current)
                        throw new ValidationError(`You can't make the value less than the already used limit`)
                }
            }



            updatedUser = makeFamilyMemberUser({
                ...user,
                ...onlyDefiendInfos,
                updatedAt: undefined
            })
        }

        return await userDb.update(updatedUser)
    }
}