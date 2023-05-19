'use strict'

const MongodbTransaction = require("./mongodb-transaction")
const { idMap, idsMap } = require('./utils')
const Product = require('./schema/product')



exports.makeProductDb = ({ makeDb }) => {
    return Object.freeze({
        create,
        update,
        findById,
        remove,
        findById,
        find,
        makeTransaction,
    })


    async function create({ id: _id, transaction, ...productInfo }) {
        await makeDb()
        const createdProduct = (await new Product({ _id, ...productInfo }).save({ session: transaction?.getSession() })).toObject()
        return idMap(createdProduct)
    }

    async function update({ id: _id, transaction, ...productInfo }) {
        await makeDb()
        const product = await Product.findOneAndUpdate({ _id }, productInfo, { session: transaction?.getSession(), new: true })
            .lean()

        if (!product)
            return null

        return idMap(product)
    }


    async function remove({ id: _id, transaction }) {
        await makeDb()
        await Product.deleteOne({ _id }, { session: transaction?.getSession })
    }



    async function findById({ id: _id, transaction }) {
        await makeDb()
        const product = await Product.findOne({ _id }, {}, { session: transaction?.getSession() }).lean()

        if (!product)
            return null

        return idMap(product)
    }


    async function find({ search = "", page, pageSize = 10, sort = 'desc', filters, transaction }) {
        await makeDb()

        const _filters = {
            ...filters,
            $expr: {
                "$regexMatch": {
                    "input": '$title',
                    "regex": search,
                    "options": "i"
                }
            }
        }

        const query = Product.find(_filters, {}, { sort: { createdAt: sort }, limit: pageSize, skip: (page - 1) * pageSize, session: transaction?.getSession() })
        const count = await Product.count(_filters)

        const products = await query.lean()
        return {
            products: idsMap(products),
            count: count
        }
    }

    async function makeTransaction() {
        await makeDb()
        return new MongodbTransaction(await Product.startSession())
    }

}