const { fakeUserDb } = require("../../../data-access/fakedb")
const { USER_ROLES } = require("../../../entities/user")
const { buildCreateFamilyMemberUserUseCase } = require("../create-family-member-user")
const { buildCreateParentUserUseCase } = require("../create-parent-user")
const { buildCreateAdminUserUseCase } = require("../create-user-admin")
const { buildEditUserUseCase } = require("../edit-user")
const { buildGetUserUseCase } = require("../get-user")
const { buildGetUserByBraceletIdUseCase } = require("../get-user-by-braceletId")
const { buildGetUsersUseCase } = require("../get-users")


const createAdminUseCase = buildCreateAdminUserUseCase(fakeUserDb)
const createParentUseCase = buildCreateParentUserUseCase(fakeUserDb)
const createFamilyMemberUseCase = buildCreateFamilyMemberUserUseCase(fakeUserDb)

const getUser = buildGetUserUseCase(fakeUserDb)
const getUserByBraceletId = buildGetUserByBraceletIdUseCase(fakeUserDb)
const getUsers = buildGetUsersUseCase(fakeUserDb)

const users = []


beforeAll(async () => {
    const admin = await createAdminUseCase({
        firstName: 'tarik',
        lastName: 'husin',
        phone: '052514556551'
    })

    const parent = await createParentUseCase({
        firstName: 'ziad',
        lastName: 'husin',
        phone: '052514556552'
    })

    const familyMember = await createFamilyMemberUseCase({
        firstName: 'mohammed',
        lastName: 'husin',
        phone: '052514556553',
        braceletId: '1234',
        parentId: parent.id
    })

    users.push(admin, parent, familyMember)
})




describe('Fetch Users Use Cases', () => {
    it('should get user by id', async () => {
        for (const user of users) {
            const fetchedUser = await getUser({ userId: user.id })

            expect(fetchedUser).toBeDefined()
            expect(fetchedUser.firstName).toEqual(user.firstName)
            expect(fetchedUser.lastName).toEqual(user.lastName)
            expect(fetchedUser.role).toEqual(user.role)
        }
    })



    it('should get user by bracelet id', async () => {
        const familyMember = users[users.length - 1]

        const fetchedUser = await getUserByBraceletId({ braceletId: familyMember.braceletId })

        expect(fetchedUser).toBeDefined()
        expect(fetchedUser.firstName).toEqual(familyMember.firstName)
        expect(fetchedUser.lastName).toEqual(familyMember.lastName)
        expect(fetchedUser.role).toEqual(familyMember.role)
    })



    it('should fetch users', async () => {
        const fetchedUsers = await getUsers({})
        expect(fetchedUsers).toBeDefined()
        expect(fetchedUsers.length).toEqual(fetchedUsers.length)

        for (const user of users) {
            const isFound = fetchedUsers.find(u => u.id === user.id)
            expect(isFound).toBeTruthy()
        }
    })


    it('should fetch users with search and paginated query', async () => {
        let fetchedUsers = await getUsers({ search: 'tt' })
        expect(fetchedUsers).toBeDefined()
        expect(fetchedUsers.length).toEqual(0)


        fetchedUsers = await getUsers({ search: 'husin', page: 1, pageSize: 2 })
        expect(fetchedUsers).toBeDefined()
        expect(fetchedUsers.length).toEqual(2)


        fetchedUsers = await getUsers({ search: 'tarik' })
        expect(fetchedUsers).toBeDefined()
        expect(fetchedUsers.length).toEqual(1)
    })

})

