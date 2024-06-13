import express from 'express'
const router = express.Router()
import tableController from '../controllers/table.controller.js'

router.post('/add-table', tableController.addTable)
router.get('/get-all-table', tableController.getAllTable)
router.get('/count-table', tableController.countTable)
router.get('/get-table-byId/:id', tableController.getTableById)
router.put('/export-table', tableController.exportTable)
router.put('/update-table/:id', tableController.updateTable)
router.delete('/delete-table', tableController.deleteTable)



export default router
