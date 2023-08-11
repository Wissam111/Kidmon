'use strict'

const Activity = require('./schema/activity')
const MongodbTransaction = require("./mongodb-transaction")
const { idMap, idsMap, mapTo_ids } = require('./utils')
const { ActivityTypes } = require('../../entities/activity')
const moment = require('moment')


exports.makeActivityDb = ({ makeDb }) => {
    return Object.freeze({
        create,
        findById,
        findByUserId,
        makeTransaction,
        findUserSpendings,
        findSpendingAtDate,
        findByFamilyMembers,
        find
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
            .find({ $or: [{ user: _id }, { to: _id }] }, {}, {
                sort: { createdAt: sort },
                limit: pageSize,
                skip: (page - 1) * pageSize,
                session: transaction?.getSession()
            })
            .lean()

        return idsMap(activites)
    }


    async function findByFamilyMembers({ familyMembers = [], page, pageSize, sort = 'desc', transaction }) {
        await makeDb()
        const activites = await Activity
            .find({ $or: [{ user: { $in: familyMembers } }, { to: { $in: familyMembers } }] }, {}, {
                sort: { createdAt: sort },
                limit: pageSize,
                skip: (page - 1) * pageSize,
                session: transaction?.getSession()
            })
            .populate('user', 'firstName lastName phone')
            .lean()

        return idsMap(activites)
    }

    async function find({ search = "", page, pageSize = 10, sort = "desc", filters, transaction }) {
        await makeDb();

        const query = Activity.find(
            filters,
            {},
            {
                sort: { createdAt: sort },
                limit: pageSize,
                skip: (page - 1) * pageSize,
                session: transaction?.getSession(),
            }
        ).populate('items._id')
        const count = await Activity.count(filters);

        const activities = await query.lean();
        return {
            activities: idsMap(activities),
            count: count,
        };
    }



    async function findSpendingAtDate({ id: _id, date, timezone }) {
        await makeDb()
        const start_date = moment(new Date(date))
        const end_date = moment(new Date(date)).add(1, 'days')
        console.log(date, start_date, end_date);
        const spending = await Activity
            .aggregate([
                {
                    $match: {
                        type: ActivityTypes.purchase,
                        user: _id,
                        createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) },
                    }
                },

                {
                    $sort: { createdAt: -1 }
                },

                {
                    $group: {
                        _id: {
                            year: {
                                $year: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                            month: {
                                $month: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                            day: {
                                $dayOfMonth: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                        },
                        totalSpendings: { $sum: '$price' },
                        count: { $count: {} }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        day: '$_id.day',
                        month: '$_id.month',
                        year: '$_id.year',
                        totalSpendings: '$totalSpendings',
                        count: "$count"
                    }
                }
            ])

        return spending.length > 0 ? spending[0] : { totalSpendings: 0, count: 0 }
    }

    async function findUserSpendings({ id: _id, start_date, end_date, timezone, transaction }) {
        await makeDb()
        const activites = await Activity
            .aggregate([
                {
                    $match: {
                        type: ActivityTypes.purchase,
                        user: _id,
                        createdAt: { $gte: new Date(start_date), $lte: new Date(end_date) },
                    }
                },

                {
                    $sort: { createdAt: -1 }
                },

                {
                    $group: {
                        _id: {
                            year: {
                                $year: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                            month: {
                                $month: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                            day: {
                                $dayOfMonth: {
                                    date: "$createdAt",
                                    timezone: timezone ? timezone : '+0300'
                                }
                            },
                        },
                        totalSpendings: { $sum: '$price' },
                        count: { $count: {} }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        day: '$_id.day',
                        month: '$_id.month',
                        year: '$_id.year',
                        totalSpendings: '$totalSpendings',
                        count: "$count"
                    }
                }
            ])

        return idsMap(activites)
    }


    async function makeTransaction() {
        await makeDb()
        return new MongodbTransaction(await Activity.startSession())
    }

}