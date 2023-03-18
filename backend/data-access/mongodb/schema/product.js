import mongoose from 'mongoose'


const productSchema = new mongoose.Schema({
    _id: { type: String },
    category: { type: String },
    title: { type: String },
    price: { type: String },
    image: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
})



export default mongoose.model('product', productSchema)