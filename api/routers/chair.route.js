import express from 'express'
const router = express.Router()

import verifyUser from '../middlewares/verifyUser.js'
import chairController from '../controllers/chair.controller.js'

router.post('/add-chair', chairController.addChair)
router.get('/get-all-chair', chairController.getAllChair)
router.get('/get-chair-byId/:id', chairController.getChairById)
router.delete('/delete-chair', chairController.deleteChair)
router.put('/update-chair/:id', chairController.updateChair)
router.put('/export-chair', chairController.exportChair)


export default router