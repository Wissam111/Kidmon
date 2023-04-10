const { makeVerify } = require(".")


describe('makeVerify',()=>{

    test('Creating Verifies', () => {

        expect(() => { makeVerify({}) }).toThrow()
        expect(() => {
            makeVerify({
                phone: '1'
            })
        }).toThrow('Verify must have a code')
    
        expect(() => {
            makeVerify({
                code: '124'
            })
        }).toThrow('Verify must have a phone number')
    
        expect(makeVerify({
            phone: '0525145565',
            code: '124'
        })).toBeDefined()
    
    
        expect(makeVerify({
            phone: '0525145565',
            code: '124'
        }).code.length > 0).toBe(true)
    
    })


})
