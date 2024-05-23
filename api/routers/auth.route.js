import express from 'express'
const router = express.Router()

import authController from '../controllers/auth.controller.js'


router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.signIn)

export default router
