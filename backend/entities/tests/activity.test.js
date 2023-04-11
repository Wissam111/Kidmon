const { makeActivity } = require("..");
const { ActivityTypes } = require("../activity");


describe('activity', () => {

    it('must successfuly create', () => {
        expect(() => {
            makeActivity({
                type: ActivityTypes.purchase
            })
        }).not.toThrow()
    })


    it('must have valid type', () => {
        expect(() => {
            makeActivity({
                type: 'aaaa'
            })
        }).toThrow()
    })

});