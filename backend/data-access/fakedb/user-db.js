"use strict";


exports.makeUserDb = () => {
    let users = []

    return Object.freeze({
        create,
        update,
        findById,
        remove,
        findById,
        findByPhone,
        makeTransaction,
        findByBraceletId,
        find,
    });

    async function create({ id: _id, transaction, ...userInfo }) {
        const user = {
            id: _id,
            ...userInfo
        }
        users.push(user)
        return { ...user };
    }

    async function update({ id: _id, populate = true, transaction, ...userInfo }) {
        const user = users.find(user => user.id === _id)
        if (!user) return

        for (const info in userInfo) {
            user[info] = userInfo[info]
        }
        return { ...user }
    }

    async function remove({ id: _id }) {
        users = users.filter(user => user.id !== _id)
    }

    async function findById({ id: _id, populate = true, transaction }) {
        const user = users.find(user => user.id === _id)
        return user ? { ...user } : null
    }

    async function findByPhone({ phone, populate = true, transaction }) {
        if (!phone) return null
        const user = users.find(user => user.phone === phone)
        return user ? { ...user } : null
    }

    async function findByBraceletId({ braceletId, populate = true, transaction, }) {
        if (!braceletId) return null
        const user = users.find(user => user.braceletId === braceletId)
        return user ? { ...user } : null
    }

    async function find({ search = "", page , pageSize = 10, sort = "desc", filters, transaction }) {
        let fetchedUsers = users

        // sort 
        fetchedUsers = users.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            return 0;
        })

        // paging
        if (page) {
            const offset = (page - 1) * pageSize
            fetchedUsers = fetchedUsers.slice(offset, offset + pageSize)
        }

        // search 
        fetchedUsers = fetchedUsers.filter(user => String(user.firstName).includes(search) || String(user.lastName).includes(search))

        return [...fetchedUsers]
    }

    async function makeTransaction() {
        return {
            startTransaction: async () => { },
            abortTransaction: async () => { },
            commitTransaction: async () => { },
            endTransaction: async () => { }
        };
    }
};
