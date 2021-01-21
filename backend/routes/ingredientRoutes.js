import express from 'express'
import { getIngredients, getIngredientById, addIngredient, deleteIngredient, getTopUsedIngredients, getCocktailIngredients } from '../controllers/ingredientsController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const router = express.Router();
router.route('/top').get(getTopUsedIngredients)
router.route('/cocktailIngredients').get(getCocktailIngredients)
router.route('/').get(getIngredients).post(protect, addIngredient).delete(protect, isAdmin, deleteIngredient)
router.route('/:id').get(getIngredientById)

export default router