import express from 'express'
const router = express.Router()
import billTableController from '../controllers/billTable.controller.js'


router.post('/add-bill-table', billTableController.addBillTable)
router.get('/get-bill-table-today', billTableController.getAllBillTableToday)
router.get('/get-bill-table-option', billTableController.getBillTableOpion)
router.get('/get-weekly-bill-table', billTableController.getWeeklyBill)
router.get('/get-monthly-bill-table', billTableController.getMonthlyBill)


export default router