import express from 'express'
import {
    getUsers, login, getUserProfile, register, deleteUser, updateUserProfile,
    getUserIngredients, addIngredientToUser, removeIngredientFromUser, getUserCocktails,
    getMyReviews, updateReview
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getUsers).delete(deleteUser)
router.route('/login').post(login)
router.route('/register').post(register)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/ingredients').put(protect, addIngredientToUser).delete(protect, removeIngredientFromUser).get(protect, getUserIngredients)
router.route('/cocktails').get(protect, getUserCocktails)
router.route('/reviews').put(protect, updateReview).get(protect, getMyReviews)

export default router