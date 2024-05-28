import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connectDB } from '../api/utils/connectDB.js'
import authRouter from './routers/auth.route.js'
import chairRouter from './routers/chair.route.js'

const port = process.env.PORT || 5000
dotenv.config({
    origin: 'http://localhost:5173', // Thay thế bằng domain của bạn
    credentials: true // Để cho phép cookie
})
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())


connectDB()
app.listen(port, () => {
    console.log('server running on port ' + port)
})

app.use('/api/auth', authRouter)
app.use('/api/chair', chairRouter)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Server Error"

    return res.status(statusCode).send({
        status: statusCode,
        success: false,
        message
    })
})