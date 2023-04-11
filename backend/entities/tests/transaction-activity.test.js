const { makeTransactionActivity } = require("..");
const { createId } = require('@paralleldrive/cuid2')

describe('transaction activity', () => {

    it('must successfuly create', () => {
        expect(() => {
            makeTransactionActivity({
                from: createId(),
                to: createId(),
                amount: 100
            })
        }).not.toThrow()
    })


    it('must have a from field', () => {
        expect(() => {
            makeTransactionActivity({
                to: createId(),
                amount: 100
            })
        }).toThrow()
    })

    it('must have a to field', () => {
        expect(() => {
            makeTransactionActivity({
                from: createId(),
                amount: 100
            })
        }).toThrow()
    })

    it('must have a price field', () => {
        expect(() => {
            makeTransactionActivity({
                from: createId(),
                to: createId(),
            })
        }).toThrow()
    })

    it('must have a valid price field', () => {
        expect(() => {
            makeTransactionActivity({
                from: createId(),
                to: createId(),
                amount: -1
            })
        }).toThrow()
    })

});