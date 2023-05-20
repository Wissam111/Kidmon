const { makeFamilyMemberUser } = require("../");
const { Allergies } = require("../family-member-user");


describe('family member user', () => {

    it('must successfuly create', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                parent: '123',
                braceletId: '123',
                allergies: [Allergies.eggs, Allergies.fish, Allergies.fish]
            })
        }).not.toThrow()
    })


    it('must have a bracelet id', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                parent: '123',
                allergies: [Allergies.eggs, Allergies.fish, Allergies.fish]
            })
        }).toThrow()
    })


    it('must have a parent id', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                braceletId: '123',
                allergies: [Allergies.eggs, Allergies.fish, Allergies.fish]
            })
        }).toThrow()
    })


    it('must have a valid allergies', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                parent: '123',
                braceletId: '123',
                allergies: [Allergies.eggs, 'asdasd', Allergies.fish]
            })
        }).toThrow()
    })


    it('must have a valid cridets number', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                parent: '123',
                braceletId: '123',
                allergies: [Allergies.eggs, Allergies.fish, Allergies.fish],
                credits: -1
            })
        }).toThrow()
    })



    it('must have a valid limits', () => {
        expect(() => {
            makeFamilyMemberUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514444',
                parent: '123',
                braceletId: '123',
                allergies: [Allergies.eggs, Allergies.fish, Allergies.fish],
                credits: 1,
                limits: {
                    daily: {
                        value: -1,
                        isActive: true
                    },
                    weeky: {
                        value: 5,
                        isActive: true
                    },
                    monthly: {
                        value: 1,
                        isActive: true
                    }
                }
            })
        }).toThrow()
    })


});