const mongoose = require('mongoose')


const activitySchema = new mongoose.Schema({
    _id: { type: String },
    type: { type: String },

    from: { type: String, ref: "user" },
    to: { type: String, ref: "user" },
    amount: { type: Number },

    user: { type: String, ref: "user" },
    items: { type: [{ _id: String, amount: Number }], ref: "prodcut", default: undefined },
    price: { type: Number },

    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const Activity = mongoose.model('activity', activitySchema)
module.exports = Activity 