import express from 'express'
import { getIngredients, getIngredientById, addIngredient } from '../controllers/ingredientsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getIngredients).post(protect, addIngredient)
router.route('/:id').get(getIngredientById)

export default router