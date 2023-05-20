const { fakeUserDb } = require("../../../data-access/fakedb")
const { USER_ROLES } = require("../../../entities/user")
const { buildCreateFamilyMemberUserUseCase } = require("../create-family-member-user")
const { buildCreateParentUserUseCase } = require("../create-parent-user")
const { buildCreateAdminUserUseCase } = require("../create-user-admin")
const { buildEditUserUseCase } = require("../edit-user")
const { buildGetUserUseCase } = require("../get-user")
const { buildRemoveUserUseCase } = require("../remove-user")


const createAdminUseCase = buildCreateAdminUserUseCase(fakeUserDb)
const createParentUseCase = buildCreateParentUserUseCase(fakeUserDb)
const createFamilyMemberUseCase = buildCreateFamilyMemberUserUseCase(fakeUserDb)
const editUserUseCase = buildEditUserUseCase({ userDb: fakeUserDb })
const removeUserUseCase = buildRemoveUserUseCase(fakeUserDb)

const getUser = buildGetUserUseCase(fakeUserDb)



describe('Delete Users Use Cases', () => {
    it('should delete the user', async () => {
        let user = await createAdminUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455658'
        })
        user = await getUser({ userId: user.id })

        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.admin)

        user = await removeUserUseCase({ userId: user.id })
        expect(user.isActive).toBeFalsy()
    })
})


describe('Edit Users Use Cases', () => {
    it('should edit the user', async () => {
        let user = await createAdminUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455655'
        })

        user = await editUserUseCase({ userId: user.id, firstName: 'ahmad', lastName: 'husin' })

        expect(user).toBeDefined()
        expect(user.firstName).toEqual('ahmad')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.admin)

        user = await getUser({ userId: user.id })

        expect(user).toBeDefined()
        expect(user.firstName).toEqual('ahmad')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.admin)
    })
})




describe('Create Users Use Cases', () => {

    it('should create admin user', async () => {

        let user = await createAdminUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455651'
        })

        user = await getUser({ userId: user.id })
        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.admin)
    })


    it('should create family member user', async () => {

        const parent = await createParentUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455653',
        })


        let user = await createFamilyMemberUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455652',
            parentId: parent.id,
            braceletId: '123',

        })

        user = await getUser({ userId: user.id })
        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.familyMember)
    })


    it('should parent user', async () => {

        let user = await createParentUseCase({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '05251455654',
        })

        user = await getUser({ userId: user.id })
        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.role).toEqual(USER_ROLES.parent)
    })

})