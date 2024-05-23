import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect(process.env.DB)
        .then(() => {
            console.log('db running')
        })
        .catch((err) => {
            console.log(err)
        })
}
