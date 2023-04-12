const { makeParentUser } = require("../");




describe('parent user', () => {

    it('must successfuly create a parent', () => {
        expect(() => {
            makeParentUser({
                firstName: 'tarik',
                lastName: 'husin',
                image: 'http://example.com',
                phone: '0525145565'
            })
        }).not.toThrow()
    })

    it('must have a valid cridets number', () => {
        expect(() => {
            makeParentUser({
                firstName: 'tarik',
                lastName: 'husin',
                image: 'http://example.com',
                phone: '0525145565',
                credits: -1
            })
        }).toThrow()
    })


    it('must have a valid cridets number', () => {
        expect(() => {
            makeParentUser({
                firstName: 'tarik',
                lastName: 'husin',
                image: 'http://example.com',
                phone: '0525145565',
                credits: -1,
                familyMembers: ['123', '++++']
            })
        }).toThrow()
    })



});