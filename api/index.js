import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from "http";
import { Server } from "socket.io";
import path from 'path'



import { connectDB } from '../api/utils/connectDB.js'
import authRouter from './routers/auth.route.js'
import chairRouter from './routers/chair.route.js'
import billRouter from './routers/bill.route.js'
import notifyProductReducer from './routers/notifyExportProduct.route.js'
import tableReducer from './routers/table.route.js'
import billTableReducer from './routers/billTable.route.js'



const port = process.env.PORT || 5000
dotenv.config({
    origin: 'http://localhost:5173', // Thay thế bằng domain của bạn
})
const app = express()
const httpServer = createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
}))
app.use(cookieParser())
app.use(express.json())

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173'
    }
});


global.onlineUser = new Map()
global.adminOnline = new Map()

io.on("connection", (socket) => {
    socket.on('user-online', user => {
        onlineUser.set(user, socket.id)
    })

    socket.on('admin-online', user => {
        adminOnline.set(user, socket.id)
    })

    socket.on('send-export-chair', dataExportChair => {
        const adminRecevie = adminOnline.get(dataExportChair.idAdmin)
        if (adminRecevie) {
            socket.to(adminRecevie).emit('recevie-export-chair', {
                from: dataExportChair.sender,
                data: dataExportChair
            })
        }
    })

    socket.on('send-export-table', dataExportTable => {
        const adminRecevie = adminOnline.get(dataExportTable.idAdmin)
        if (adminRecevie) {
            socket.to(adminRecevie).emit('recevie-export-table', {
                from: dataExportTable.sender,
                data: dataExportTable
            })
        }
    })

});


connectDB()
httpServer.listen(5000, () => {
    console.log('server running on port ' + port)
})

app.use('/api/auth', authRouter)
app.use('/api/chair', chairRouter)
app.use('/api/bill', billRouter)
app.use('/api/notify-product', notifyProductReducer)
app.use('/api/table', tableReducer)
app.use('/api/bill-table', billTableReducer)


const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Server Error"

    return res.status(statusCode).send({
        status: statusCode,
        success: false,
        message
    })
})