import express from 'express'
import { getUsers, login, getUserProfile, register, deleteUser, updateUserProfile, addIngredientToUser, removeIngredientFromUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getUsers).delete(deleteUser)
router.route('/login').post(login)
router.route('/register').post(register)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/ingredients').put(protect, addIngredientToUser).delete(protect, removeIngredientFromUser)
export default router