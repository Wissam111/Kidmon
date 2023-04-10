


const makeVerifyDb = ({ makeDb }) => {
    return Object.freeze({
        create,
        findById,
        count
    })

    async function create({ id, phone, code, expire = 60 }) {
        const client = await makeDb()
        console.log(id, phone, code);
        await client.set(id, JSON.stringify({ phone, code }), { EX: expire, NX: true })
        await client
            .multi()
            .incr(phone)
            .expire(phone, expire, 'NX')
            .exec()
    }

    async function findById({ id }) {
        const client = await makeDb()
        return JSON.parse(await client.get(id))
    }

    // counts number of verfies requrest for this phone number
    async function count({ phone }) {
        const client = await makeDb()
        return await client.get(phone) || 0
    }

}


module.exports = {
    makeVerifyDb
}