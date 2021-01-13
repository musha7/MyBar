import express from 'express'
import {
    getUsers, login, getUserProfile, register, deleteUser, updateUserProfile,
    getUserIngredients, addIngredientToUser, removeIngredientFromUser, getUserCocktails,
    getMyReviews, updateReview, makeAdmin
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(protect, isAdmin, getUsers).delete(protect, isAdmin, deleteUser).put(protect, isAdmin, makeAdmin)
router.route('/login').post(login)
router.route('/register').post(register)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/ingredients').put(protect, addIngredientToUser).delete(protect, removeIngredientFromUser).get(protect, getUserIngredients)
router.route('/cocktails').get(protect, getUserCocktails)
router.route('/reviews').put(protect, updateReview).get(protect, getMyReviews)

export default router