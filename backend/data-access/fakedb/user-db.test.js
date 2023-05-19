const { makeUser } = require("../../entities");
const { USER_ROLES } = require("../../entities/user");
const { makeUserDb } = require("./user-db");

let userDb = makeUserDb()
let staticUser = null


beforeEach(async () => {
    userDb = makeUserDb()
    staticUser = await userDb.create(makeUser({ firstName: 'ziad', lastName: 'husin', phone: '0525409948', role: USER_ROLES.parent }))
})


describe("", () => {

    it("should insert the user", async () => {
        let user = await userDb.create(makeUser({ firstName: 'tarik', lastName: 'husin', phone: '0525145565', role: USER_ROLES.parent }))
        user = await userDb.findById({ id: user.id })

        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.phone).toEqual('0525145565')
        expect(user.role).toEqual(USER_ROLES.parent)
    })

    it("should update the user", async () => {
        let user = await userDb.findById({ id: staticUser.id })
        expect(user).toBeDefined()

        const updatedUser = await userDb.update({ ...user, firstName: 'mo' })
        expect(updatedUser).toBeDefined()
        expect(updatedUser.firstName).toEqual('mo')
    })


    it("should delete the user", async () => {
        userDb.remove({ id: staticUser.id })
        let user = await userDb.findById({ id: staticUser.id })
        expect(user).toBeNull()
    })


    it("should fetch all users", async () => {
        await userDb.create(makeUser({ firstName: 'tarik', lastName: 'husin', phone: '0525145565', role: USER_ROLES.parent }))
        await userDb.create(makeUser({ firstName: 'tarik', lastName: 'husin', phone: '0525145565', role: USER_ROLES.parent }))

        const users = await userDb.find({})
        expect(users.length).toEqual(3)
    })
})



