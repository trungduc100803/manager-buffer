import express from 'express'
const router = express.Router()

import authController from '../controllers/auth.controller.js'


router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)
router.post('/sign-out', authController.singOut)
router.post('/verify-password', authController.verifyPassword)
router.get('/get-account-admin', authController.getAccountAdmin)
router.get('/get-auth-by-id/:id', authController.getAuthById)
router.get('/get-all-auth', authController.getAllAuth)
router.put('/update-auth', authController.updateAuth)
router.put('/change-password/:id', authController.changPassword)

export default router
