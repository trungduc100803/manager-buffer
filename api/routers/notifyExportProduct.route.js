import express from 'express'
const router = express.Router()
import notifyExportProductController from '../controllers/notifyExprtProduct.controller.js'


router.post('/add-notify-export-product', notifyExportProductController.addNotifyProduct)
router.get('/get-all-notify-export-product', notifyExportProductController.getAllNotifyProduct)
router.post('/edit-status-notify-export-product', notifyExportProductController.editStatusById)

export default router