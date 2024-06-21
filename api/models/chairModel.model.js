import mongoose from "mongoose";


const chairModel = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    urlImg: [
        {
            type: String,
            require: true
        }
    ],
    numberCurrent: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    dateIn: {
        type: String,
        require: true
    },
    numberAtIn: {
        type: Number,
        require: true
    },
    addressIn: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    moreStatus: [
        {
            numberChairStatus: {
                type: Number,
                default: 0
            },
            statusChair: {
                type: String,
                default: ''
            }
        }
    ]

}, { timestamps: true })


const Chair = mongoose.model('chair', chairModel)
export default Chair