import express from 'express'
const router = express.Router()
import billController from '../controllers/bill.controller.js'

router.post('/add-bill', billController.addBill)
router.get('/get-bill-today', billController.getAllBillToday)
router.get('/get-bill-option', billController.getBillOption)
router.get('/get-weekly-bill', billController.getWeeklyBill)
router.get('/get-monthly-bill', billController.getMonthlyBill)

export default router