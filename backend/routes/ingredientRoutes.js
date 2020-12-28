import express from 'express'
import { getIngredients, getIngredientById } from '../controllers/ingredientsController.js'

const router = express.Router();

router.route('/').get(getIngredients)
router.route('/:id').get(getIngredientById)

export default router