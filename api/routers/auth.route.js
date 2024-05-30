import express from 'express'
const router = express.Router()

import authController from '../controllers/auth.controller.js'


router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)
router.post('/sign-out', authController.singOut)
router.get('/get-account-admin', authController.getAccountAdmin)
router.get('/get-auth-by-id/:id', authController.getAuthById)

export default router
