const { fakeUserDb, fakeActivityDb, fakeProductDb } = require("../../../data-access/fakedb");
const { buildChargePointsUseCase } = require("../../user-use-case/charge-points");
const { buildCreateFamilyMemberUserUseCase } = require("../../user-use-case/create-family-member-user");
const { buildCreateParentUserUseCase } = require("../../user-use-case/create-parent-user");
const { buildCreateAdminUserUseCase } = require("../../user-use-case/create-user-admin");
const { buildGetUserUseCase } = require("../../user-use-case/get-user");
const { buildGetUserByBraceletIdUseCase } = require("../../user-use-case/get-user-by-braceletId");
const { buildGetUsersUseCase } = require("../../user-use-case/get-users");
const { buildPurchaseUseCase } = require("../purchase");
const { buildTransferPointsUserUseCase } = require("../transfer-points");



const createAdminUseCase = buildCreateAdminUserUseCase(fakeUserDb)
const createParentUseCase = buildCreateParentUserUseCase(fakeUserDb)
const createFamilyMemberUseCase = buildCreateFamilyMemberUserUseCase(fakeUserDb)

const getUser = buildGetUserUseCase(fakeUserDb)
const getUserByBraceletId = buildGetUserByBraceletIdUseCase(fakeUserDb)
const getUsers = buildGetUsersUseCase(fakeUserDb)

const transferPoints = buildTransferPointsUserUseCase({ activityDb: fakeActivityDb, userDb: fakeUserDb })
const purchase = buildPurchaseUseCase({ activityDb: fakeActivityDb, userDb: fakeUserDb })

const chargePoints = buildChargePointsUseCase({ userDb: fakeUserDb })

const users = []

beforeAll(async () => {
    const admin = await createAdminUseCase({
        firstName: 'tarik',
        lastName: 'husin',
        phone: '052514556551'
    })

    let parent = await createParentUseCase({
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

    parent = await chargePoints({ userId: parent.id, points: 5000 })

    users.push(admin, parent, familyMember)
})






describe('', () => {

    it('should transfer points', async () => {
        const parent = users[1]
        const familyMember = users[2]
        const transferAmout = 30

        await transferPoints({ senderUserId: parent.id, receiverUserId: familyMember.id, amount: transferAmout })

        const updatedFamilyMember = await getUser({ userId: familyMember.id })
        const updatedParent = await getUser({ userId: parent.id })

        console.log(updatedFamilyMember);
        expect(updatedFamilyMember).toBeDefined()
        expect(updatedParent).toBeDefined()
        expect(updatedFamilyMember.credits).toBe(familyMember.credits + transferAmout)
        expect(updatedParent.credits).toBe(parent.credits - transferAmout)
    });


    it('should make purchase', async () => {

        // transfer 30 points

        const parent = users[1]
        const familyMember = users[2]
        const transferAmout = 30





    });
})


