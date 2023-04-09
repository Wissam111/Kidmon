const { ValidateNumbersOnly } = require("./validators");
const { buildMakeVerify } = require("./verify");

const makeVerify = buildMakeVerify(ValidateNumbersOnly)



test('Creating Verifies', () => {

    expect(() => { makeVerify({}) }).toThrow()
    expect(() => {
        makeVerify({
            phone: '1'
        })
    }).toThrow()

    expect(makeVerify({
        phone: '0525145565',
        code: '124'
    })).toBeDefined()


    expect(makeVerify({
        phone: '0525145565',
        code: '124'
    }).code.length > 0).toBe(true)

})