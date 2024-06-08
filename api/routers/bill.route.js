import express from 'express'
const router = express.Router()
import billController from '../controllers/bill.controller.js'

router.post('/add-bill', billController.addBill)
router.get('/get-bill-today', billController.getAllBillToday)
router.get('/get-bill-option', billController.getBillOption)

export default router