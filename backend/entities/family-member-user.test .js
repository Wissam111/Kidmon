const { makeFamilyMemberUser } = require(".");




describe('making user', () => {


    test('should make a family member user', () => {

        const user = makeFamilyMemberUser({
            firstName: 'tarik',
            lastName: 'husin',
            phone: '0525145565',
            
        })

        expect(user).toBeDefined()
        expect(user.firstName).toEqual('tarik')
        expect(user.lastName).toEqual('husin')
        expect(user.phone).toEqual('0525145565')
        expect(user.role).toEqual('admin')
    });




    test('should make an exception field required', () => {

        expect(() => {
            makeUser({
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('User must have a firstName')


        expect(() => {
            makeUser({
                firstName: 'tarik',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('User must have a lastName')

        expect(() => {
            makeUser({
                firstName: 'tarik',
                lastName: 'husin',
                role: 'admin'
            })
        }).toThrow('User must have a phone')

        expect(() => {
            makeUser({
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565',
            })
        }).toThrow('User must have a role')
    })






    test('should make an exception bad cid', () => {

        expect(() => {
            makeUser({
                id: 'not a cuid',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('User must have a valid ID')


        expect(() => {
            makeUser({
                id: 'sdfsdvrfb45tg4gb3r23fdcv+_+_+_',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('User must have a valid ID')

    })






    // first name should contain only letters and 2 to 20 length
    test('first name should have chars only seperated by one space', () => {
        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik husin asdfghjkv',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must be 2 to 20 chars')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik husin asdfghjk',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('firstName must be 2 to 20 chars')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'ta',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('firstName must be 2 to 20 chars')

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 't',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must be 2 to 20 chars')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik +',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must contains characters only seperated by space')

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik ',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must contains characters only seperated by space')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: ' tarik',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must contains characters only seperated by space')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik hh',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('firstName must contains characters only seperated by space')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik  hh',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must contains characters only seperated by space')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik,hh',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('firstName must contains characters only seperated by space')
    })






    // last name should contain only letters
    test('last name should have chars only seperated by one space', () => {


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'tarik husin asdfghjkv',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must be 2 to 20 chars')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'tarik husin asdfghjk',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('lastName must be 2 to 20 chars')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'hu',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('lastName must be 2 to 20 chars')

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'h',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must be 2 to 20 chars')




        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin +',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must contains characters only seperated by space')

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin ',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must contains characters only seperated by space')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: ' husin',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must contains characters only seperated by space')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin hh',
                phone: '0525145565',
                role: 'admin'
            })
        }).not.toThrow('lastName must contains characters only seperated by space')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin  hh',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must contains characters only seperated by space')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin,hh',
                phone: '0525145565',
                role: 'admin'
            })
        }).toThrow('lastName must contains characters only seperated by space')
    })







    // phone number should contain only numbers
    test('phone should have numbers only', () => {

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '052514556_+5',
                role: 'admin'
            })
        }).toThrow('phone must be numbers only')

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565 ',
                role: 'admin'
            })
        }).toThrow('phone must be numbers only')


        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin',
                phone: ' 0525145565',
                role: 'admin'
            })
        }).toThrow('phone must be numbers only')
    })









    // role must be admin , family-member or parent
    test('role must be admin , family-member or parent', () => {

        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565',
                role: 'admin+'
            })
        }).toThrow('role must be either parent, family-memeber or an admin')



        expect(() => {
            makeUser({
                id: '1234',
                firstName: 'tarik',
                lastName: 'husin',
                phone: '0525145565',
                role: 'barber'
            })
        }).toThrow('role must be either parent, family-memeber or an admin')
    })



});