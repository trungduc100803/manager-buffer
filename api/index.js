import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookie_parser from 'cookie-parser'

import { connectDB } from '../api/utils/connectDB.js'
import authRouter from './routers/auth.route.js'


const port = process.env.PORT || 5000
dotenv.config()
const app = express()
app.use(cors())
app.use(cookie_parser())
app.use(express.json())


connectDB()
app.listen(port, () => {
    console.log('server running on port ' + port)
})

app.use('/api/auth', authRouter)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Server Error"

    return res.status(statusCode).send({
        status: statusCode,
        success: false,
        message
    })
})