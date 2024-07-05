import mongoose from "mongoose";


const billTableModel = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    idTable: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chair'
    },
    number: { type: Number, require: true },
    dateOut: { type: String, require: true },
    totalPrice: { type: Number, require: true },
    nameTable: {
        type: String,
        require: true
    },
    priceTable: {
        type: Number,
        require: true
    },
    urlImgTable: {
        type: String,
        require: true
    },
    // colorTable: {
    //     type: String,
    //     require: true
    // },
    size: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: new Date()
    }
}, { timestamps: true })


const BillTable = mongoose.model('BillTable', billTableModel)
export default BillTable