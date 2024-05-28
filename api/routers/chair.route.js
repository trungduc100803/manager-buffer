import express from 'express'
const router = express.Router()

import verifyUser from '../middlewares/verifyUser.js'
import chairController from '../controllers/chair.controller.js'

router.post('/add-chair', verifyUser, chairController.addChair)


export default router