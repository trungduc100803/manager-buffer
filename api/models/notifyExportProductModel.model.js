import mongoose from "mongoose";


const NotifyExportProductModel = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    idProduct: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        require: true
    },
    dateOut: {
        type: String,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    }
}, { timestamps: true })

const Notify = mongoose.model('notifyExportProduct', NotifyExportProductModel)
export default Notify