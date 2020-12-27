import express from 'express'
import { getIngredients, getIngredientById, addIngredientToBar } from '../controllers/ingredientsController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getIngredients).put(protect, addIngredientToBar)
router.route('/:id').get(getIngredientById)

export default router