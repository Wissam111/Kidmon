const mongoose = require('mongoose')


const limitSchema = new mongoose.Schema({
    daily: { type: Number },
    weekly: { type: Number },
    monthly: { type: Number }
}, { _id: false })


const userSchema = new mongoose.Schema({
    _id: { type: String },
    braceletId: { type: String, index: { unique: true }, sparse: true },
    parent: { type: String, ref: "user" },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, index: { unique: true } },
    image: { type: String },
    credits: { type: Number },
    allergies: { type: [String], default: undefined },
    limits: { type: limitSchema },
    familyMembers: { type: [String], ref: 'user', default: undefined },
    role: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const User = mongoose.model('user', userSchema)
module.exports = User

