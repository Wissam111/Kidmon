const mongoose = require('mongoose')


const limitSchema = new mongoose.Schema({
    value: { type: Number, default: 0 },
    current: { type: Number , default: 0},
    isActive: { type: Boolean , default: false},
}, { _id: false })


const limitsSchema = new mongoose.Schema({
    daily: { type: limitSchema },
    weekly: { type: limitSchema },
    monthly: { type: limitSchema },
    isActive: { type: Boolean , default: false},
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
    limits: { type: limitsSchema },
    familyMembers: { type: [String], ref: 'user', default: undefined },
    role: { type: String },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const User = mongoose.model('user', userSchema)
module.exports = User

