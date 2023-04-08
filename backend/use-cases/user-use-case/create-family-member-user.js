const { makeFamilyMemberUser } = require("../../entities")
const { AlreadyExistsError, NotFoundError } = require("../../utils/errors")



const buildCreateFamilyMemberUserUseCase = (userDb) => {
    // no need for transaction because phone is primary key in the database
    return async ({ firstName, lastName, phone, image, braceletId, parentId, allergies }) => {

        // check if phone exsits
        const phoneExsits = await userDb.findByPhone({ phone: phone })
        if (phoneExsits) {
            throw new AlreadyExistsError('Phone already exists')
        }

        // check if braceletId exists
        const bracelet = await userDb.findByBraceletId({ id: braceletId })
        if (bracelet)
            throw new AlreadyExistsError('braceletId already exists')


        // check if parent exists
        const parent = await userDb.findById({ id: parentId, populate: false })
        if (!parent)
            throw new NotFoundError("Parent does not exist")


        // create family member user
        user = makeFamilyMemberUser({ firstName, lastName, phone, image, braceletId, parent: parentId, allergies })
        const createdUser = await userDb.create(user)


        // update parent family members
        parent.familyMembers.push(user.id)
        await userDb.update({ ...parent, updatedAt: undefined })


        return createdUser
    }

}


module.exports = { buildCreateFamilyMemberUserUseCase }