const { makePurchaseActivity } = require("..");
const { createId } = require('@paralleldrive/cuid2')

describe('purchase activity', () => {

    it('must successfuly create', () => {
        expect(() => {
            makePurchaseActivity({
                items: [{ id: createId(), amount: 5 }],
                price: 100,
                user: createId()
            })
        }).not.toThrow()
    })


    it('must valid items attributes', () => {
        expect(() => {
            makePurchaseActivity({
                items: [{ id: createId() }],
                price: 100,
                user: createId()
            })
        }).toThrow()
    })


    it('must a valid price', () => {
        expect(() => {
            makePurchaseActivity({
                items: [{ id: createId(), amount: 5 }],
                price: -1,
                user: createId()
            })
        }).toThrow()
    })


    it('must a valid user', () => {
        expect(() => {
            makePurchaseActivity({
                items: [{ id: createId(), amount: 5 }],
                price: -1,
                user: '++12344'
            })
        }).toThrow()
    })
});