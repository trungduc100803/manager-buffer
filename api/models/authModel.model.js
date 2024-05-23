import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    urlImgProfile: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Auth = mongoose.model('auth', authSchema)
export default Auth