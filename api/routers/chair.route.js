import express from 'express'
const router = express.Router()

import verifyUser from '../middlewares/verifyUser.js'
import chairController from '../controllers/chair.controller.js'

router.post('/add-chair', chairController.addChair)
router.get('/get-all-chair', chairController.getAllChair)
router.delete('/delete-chair', chairController.deleteChair)


export default router