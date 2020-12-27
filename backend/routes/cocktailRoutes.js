import express from 'express'
import { getCocktails, getCocktailById } from '../controllers/cocktailController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getCocktails)
router.route('/:id').get(protect, getCocktailById)

export default router