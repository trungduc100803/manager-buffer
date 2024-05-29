import express from 'express'
const router = express.Router()
import billController from '../controllers/bill.controller.js'

router.post('/add-bill', billController.addBill)

export default router