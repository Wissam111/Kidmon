'use strict'

const User = require('./schema/user')
const MongodbTransaction = require("./mongodb-transaction")
const { idMap, idsMap } = require('./utils')




exports.makeUserDb = ({ makeDb }) => {
    return Object.freeze({
        create,
        update,
        findById,
        remove,
        findById,
        findByPhone,
        makeTransaction,
        findByBraceletId
    })


    async function create({ id: _id, transaction, ...userInfo }) {
        await makeDb()

        const createdUser = (await new User({ _id, ...userInfo }).save({ session: transaction?.getSession() })).toObject()
        return idMap(createdUser)
    }

    async function update({ id: _id, populate = true, transaction, ...userInfo }) {
        await makeDb()
        const user = await User.findOneAndUpdate({ _id }, userInfo, {
            session: transaction?.getSession(),
            populate: populate ? [{ path: 'parent', select: 'id firstName lastName phone credits' }, { path: 'familyMembers' }] : null
        })
            .lean()

        if (!user)
            return null

        return {
            ...idMap(user),
            parent: populate ? idMap(user.parent) : user.parent,
            familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers
        }
    }



    async function remove({ id: _id, transaction }) {
        await makeDb()
        throw new Error('Method not implemented.');
    }



    async function findById({ id: _id, populate = true, transaction }) {
        await makeDb()
        const user = await User.findOne({ _id }, {}, {
            session: transaction?.getSession(),
            populate: populate ? [{ path: 'parent', select: 'id firstName lastName phone credits' }, { path: 'familyMembers' }] : null
        })
            .lean()

        if (!user)
            return null

        return {
            ...idMap(user),
            parent: populate ? idMap(user.parent) : user.parent,
            familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers
        }
    }


    async function findByPhone({ phone, populate = true, transaction },) {
        await makeDb()
        const user = await User.findOne({ phone }, {}, {
            session: transaction?.getSession(),
            populate: populate ? [{ path: 'parent', select: 'id firstName lastName phone credits' }, { path: 'familyMembers' }] : null
        })

            .lean()

        if (!user)
            return null

        return {
            ...idMap(user),
            parent: populate ? idMap(user.parent) : user.parent,
            familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers
        }
    }


    async function findByBraceletId({ id, populate = true, transaction }) {
        await makeDb()
        const user = await User.findOne({ braceletId: id }, {}, {
            session: transaction?.getSession(),
            populate: populate ? [{ path: 'parent', select: 'id firstName lastName phone credits' }, { path: 'familyMembers' }] : null
        })
            .lean()

        if (!user)
            return null
        return {
            ...idMap(user),
            parent: populate ? idMap(user.parent) : user.parent,
            familyMembers: populate ? idsMap(user.familyMembers) : user.familyMembers
        }
    }


    async function makeTransaction() {
        await makeDb()
        return new MongodbTransaction(await User.startSession())
    }

}