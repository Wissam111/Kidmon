"use strict";


exports.makeProductDb = () => {
    let products = []

    return Object.freeze({
        create,
        update,
        findById,
        remove,
        findById,
        makeTransaction,
        find,
    });

    async function create({ id: _id, transaction, ...productInfo }) {
        const product = {
            id: _id,
            ...productInfo
        }
        products.push(product)
        return { ...user };
    }

    async function update({ id: _id, populate = true, transaction, ...productInfo }) {
        const product = products.find(product => product.id === _id)
        if (!product) return

        for (const info in productInfo) {
            product[info] = productInfo[info]
        }
        return { ...product }
    }

    async function remove({ id: _id }) {
        products = products.filter(product => product.id !== _id)
    }

    async function findById({ id: _id, populate = true, transaction }) {
        const product = products.find(product => product.id === _id)
        return product ? { ...product } : null
    }

    async function find({ search = "", page, pageSize = 10, sort = "desc", filters, transaction }) {
        let fetchedproducts = products

        // sort 
        fetchedproducts = products.sort((a, b) => {
            if (a.createdAt < b.createdAt) return -1;
            else if (a.createdAt > b.createdAt) return 1;
            return 0;
        })

        // paging
        if (page) {
            const offset = (page - 1) * pageSize
            fetchedproducts = fetchedproducts.slice(offset, offset + pageSize)
        }

        // search 
        fetchedproducts = fetchedproducts.filter(user => String(user.firstName).includes(search) || String(user.lastName).includes(search))

        return [...fetchedproducts]
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
