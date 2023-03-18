const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String, index: { unique: true } },
    image: { type: String },
    credits: { type: Number },
    allergies: { type: [String] },
    familyMembers: { type: [String] },
    role: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const User = mongoose.model('user', userSchema)
module.exports = User

