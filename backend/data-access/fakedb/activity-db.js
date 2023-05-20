"use strict";


exports.makeActivityDb = () => {
    let activities = []

    return Object.freeze({
        create,
        update,
        findById,
        remove,
        findById,
        makeTransaction,
        find,
    });

    async function create({ id: _id, transaction, ...activityInfo }) {
        const activity = {
            id: _id,
            ...activityInfo
        }
        activities.push(activity)
        return { ...user };
    }

    async function update({ id: _id, populate = true, transaction, ...activityInfo }) {
        const activity = activities.find(activity => activity.id === _id)
        if (!activity) return

        for (const info in activityInfo) {
            activity[info] = activityInfo[info]
        }
        return { ...activity }
    }

    async function remove({ id: _id }) {
        activities = activities.filter(activity => activity.id !== _id)
    }

    async function findById({ id: _id, populate = true, transaction }) {
        const activity = activities.find(activity => activity.id === _id)
        return activity ? { ...activity } : null
    }

    async function find({ search = "", page, pageSize = 10, sort = "desc", filters, transaction }) {
        let fetchedActivities = activities

        // sort 
        fetchedActivities = activities.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            return 0;
        })

        // paging
        if (page) {
            const offset = (page - 1) * pageSize
            fetchedActivities = fetchedActivities.slice(offset, offset + pageSize)
        }

        // search 
        fetchedActivities = fetchedActivities.filter(user => String(user.firstName).includes(search) || String(user.lastName).includes(search))

        return [...fetchedActivities]
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
