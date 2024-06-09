import mongoose from "mongoose";

const tableSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    //ok
    number: {
        type: Number,
        require: true
    },
    //ok
    numberCurrent: {
        type: Number,
        require: true
    },
    //ok
    size: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    //ok
    dateIn: {
        type: String,
        require: true
    },
    //ok
    addressIn: {
        type: String,
        require: true
    },
    //ok
    status: {
        type: String,
        require: true
    },
    //ok
    urlImgTable: {
        type: String,
        require: true
    },
    //ok
    price: {
        type: Number,
        require: true
    },
    //ok
    note: {
        type: String,
        default: ''
    }

}, { timestamps: true})

const Table = mongoose.model('table', tableSchema)
export default Table