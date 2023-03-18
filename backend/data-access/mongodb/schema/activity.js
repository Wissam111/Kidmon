import mongoose from 'mongoose'


const activitySchema = new mongoose.Schema({
    _id: { type: String },
    tpye: { type: String },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    products: { type: [mongoose.Schema.Types.ObjectId], ref: "user" },
    price: { type: Number },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})



export default mongoose.model('activites', activitySchema)