const User = require('./schema/user')
const MongodbTransaction = require('./mongodb-transaction')






module.exports = class UserRepository {


    async create({ id: _id, transaction, ...userInfo }) {
        const createdUser = await new User({ _id, ...userInfo }).save({ session: transaction?.getSession() })
        const { _id: id, insertedInfo } = createdUser

        return {
            id,
            ...insertedInfo
        }
    }

    async update({ id: _id, transaction, updatedData }) {
        const query = User.findOneAndUpdate({ _id }, updatedData, { new: true })

        if (transaction) {
            query.session(transaction.getSession())
        }

        const updatedUserObj = await query.lean()

        if (!updatedUserObj)
            return null


        return {
            ...updatedUserObj,
            id: updatedUserObj._id.toString()
        }
    }



    delete({ id: _id }, transaction) {
        throw new Error('Method not implemented.');
    }





    async findById({ id: _id, transaction }) {
        const query = User.findOne({ _id })

        if (transaction) {
            query.session(transaction.getSession())
        }

        const user = await query.lean()

        if (!user)
            return null

        return {
            ...user,
            id: user._id.toString()
        }
    }


    async findByPhone({ phone, transaction },) {
        const query = User.findOne({ phone })

        if (transaction) {
            query.session(transaction.getSession())
        }

        const user = await query.lean()

        if (!user)
            return null

        return {
            ...user,
            id: user._id.toString()
        }
    }




    async makeTransaction() {
        return new MongodbTransaction(await User.startSession())
    }

}