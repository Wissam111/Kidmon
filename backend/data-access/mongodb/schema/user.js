const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    image: { type: String },
    credits: { type: Number },
    alergies: { type: [String] },
    familyMembers: { type: [String] },
    role: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})


const User = mongoose.model('user', userSchema)
module.exports = User

