import mongoose from "mongoose";


const billModel = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    idChair: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chair'
    },
    number: { type: Number, require: true },
    dateOut: { type: String, require: true },
    totalPrice: { type: Number, require: true },
    nameChair: {
        type: String,
        require: true
    },
    priceChair: {
        type: Number,
        require: true
    },
    urlImgChair: {
        type: String,
        require: true
    },
    colorChair: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: new Date()
    }
}, { timestamps: true })


const Bill = mongoose.model('Bill', billModel)
export default Bill