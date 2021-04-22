import express from 'express'
import {authUser, getUserProfile, registerUser} from '../controllers/userController.js'
import {checkUserAuthMiddleware} from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)
router.route('/profile').get(checkUserAuthMiddleware, getUserProfile)
router.route('/register').post(registerUser)

export default router