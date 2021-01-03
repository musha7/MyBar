import express from 'express'
import { getCocktails, getCocktailById, addReview, getReviews } from '../controllers/cocktailController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getCocktails)
router.route('/:id').get(protect, getCocktailById)
router.route('/:id/reviews').post(protect, addReview).get(protect, getReviews)

export default router