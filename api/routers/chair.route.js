import express from 'express'
const router = express.Router()

import verifyUser from '../middlewares/verifyUser.js'
import chairController from '../controllers/chair.controller.js'

router.post('/add-chair', chairController.addChair)
router.get('/get-all-chair', chairController.getAllChair)
router.get('/count-chair', chairController.countChair)
router.get('/get-chair-byId/:id', chairController.getChairById)
router.delete('/delete-chair', chairController.deleteChair)
router.put('/edit-name-chair/:id', chairController.editNameChairById)
router.put('/add-number-chair/:id', chairController.addNumberChair)
router.put('/export-chair', chairController.exportChair)
router.put('/edit-number-chair-beautifull/:id', chairController.editNumberChairBeautifull)
router.delete('/remove-number-chair-error/:id', chairController.removeNumberChairErr)


export default router