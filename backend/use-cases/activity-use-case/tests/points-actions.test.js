const { fakeUserDb, fakeActivityDb, fakeProductDb } = require("../../../data-access/fakedb");
const { Allergies } = require("../../../entities/family-member-user");
const { PRODUCT_CATEGORIES } = require("../../../entities/product");
const { buildCreateProductUseCase } = require("../../product-use-case/create-product");
const { buildChargePointsUseCase } = require("../../user-use-case/charge-points");
const { buildCreateFamilyMemberUserUseCase } = require("../../user-use-case/create-family-member-user");
const { buildCreateParentUserUseCase } = require("../../user-use-case/create-parent-user");
const { buildCreateAdminUserUseCase } = require("../../user-use-case/create-user-admin");
const { buildGetUserUseCase } = require("../../user-use-case/get-user");
const { buildPurchaseUseCase } = require("../purchase");
const { buildTransferPointsUserUseCase } = require("../transfer-points");



const createAdminUseCase = buildCreateAdminUserUseCase(fakeUserDb)
const createParentUseCase = buildCreateParentUserUseCase(fakeUserDb)
const createFamilyMemberUseCase = buildCreateFamilyMemberUserUseCase(fakeUserDb)
const createProductUseCase = buildCreateProductUseCase({ productDb: fakeProductDb })

const getUser = buildGetUserUseCase(fakeUserDb)

const transferPoints = buildTransferPointsUserUseCase({ activityDb: fakeActivityDb, userDb: fakeUserDb })
const purchase = buildPurchaseUseCase({ activityDb: fakeActivityDb, userDb: fakeUserDb, productDb: fakeProductDb })

const chargePoints = buildChargePointsUseCase({ userDb: fakeUserDb })

const users = []
const products = []

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


    const p1 = await createProductUseCase({ price: 9.99, title: 'Dotertos', category: PRODUCT_CATEGORIES.snack, allergicIngredients: [Allergies.milk, Allergies.eggs] })
    const p2 = await createProductUseCase({ price: 20.99, title: 'Coffe', category: PRODUCT_CATEGORIES.hot })
    products.push(p1, p2)
})






describe('', () => {

    it('should transfer points', async () => {
        const parent = users[1]
        const familyMember = users[2]
        const transferAmout = 30

        await transferPoints({ senderUserId: parent.id, receiverUserId: familyMember.id, amount: transferAmout })

        const updatedFamilyMember = await getUser({ userId: familyMember.id })
        const updatedParent = await getUser({ userId: parent.id })

        expect(updatedFamilyMember).toBeDefined()
        expect(updatedParent).toBeDefined()
        expect(updatedFamilyMember.credits).toBe(familyMember.credits + transferAmout)
        expect(updatedParent.credits).toBe(parent.credits - transferAmout)
    });


    it('should make purchase', async () => {

        const parent = users[1]
        const familyMember = users[2]
        const [product1, product2] = products

        const transferAmout = 100
        await transferPoints({ senderUserId: parent.id, receiverUserId: familyMember.id, amount: transferAmout })

        const currentCredits = (await getUser({ userId: familyMember.id })).credits


        const purchaseItems = [
            { id: product1.id, amount: 2 },
            { id: product2.id, amount: 1 }
        ]
        const expectedPrice = product1.price * 2 + product2.price

        await purchase({ userId: familyMember.id, items: purchaseItems })


        const updatedFamilyMember = await getUser({ userId: familyMember.id })
        expect(updatedFamilyMember).toBeDefined()
        expect(updatedFamilyMember.credits).toBe(currentCredits - expectedPrice)
    });
})


