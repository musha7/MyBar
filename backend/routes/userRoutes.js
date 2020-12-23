import express from 'express'
import { getUsers, login, getUserProfile, register } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getUsers)
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/profile').get(protect, getUserProfile)

export default router