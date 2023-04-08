'use strict'

const Activity = require('./schema/activity')
const MongodbTransaction = require("./mongodb-transaction")
const { idMap, idsMap, mapTo_ids } = require('./utils')



exports.makeActivityDb = ({ makeDb }) => {
    return Object.freeze({
        create,
        findById,
        findByUserId,
        makeTransaction,
    })


    async function create({ id: _id, transaction, ...activityInfo }) {
        await makeDb()
        if (activityInfo.items) {
            activityInfo.items = mapTo_ids(activityInfo.items)
        }
        const activity = (await new Activity({ _id, ...activityInfo }).save({ session: transaction?.getSession() })).toObject()
        return idMap(activity)
    }



    async function findById({ id: _id, transaction }) {
        await makeDb()
        const activity = await Activity.findOne({ _id }, {}, { session: transaction?.getSession() }).lean()

        if (!activity)
            return null

        return idMap(activity)
    }


    async function findByUserId({ id: _id, page, pageSize, sort = 'desc', filters, transaction }) {
        await makeDb()
        const activites = await Activity
            .find(filters, {}, {
                sort: { createdAt: sort },
                limit: pageSize,
                skip: (page - 1) * pageSize,
                session: transaction?.getSession()
            })
            .lean()

        return idsMap(activites)
    }

    async function makeTransaction() {
        return new MongodbTransaction(await Activity.startSession())
    }

}