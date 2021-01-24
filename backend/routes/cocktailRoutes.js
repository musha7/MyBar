import express from 'express'
import { getCocktails, getCocktailById, addReview, getReviews, addCocktail, deleteCocktail, getTopRatedCocktails, updateCocktail } from '../controllers/cocktailController.js'
import { isAdmin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/top').get(getTopRatedCocktails)

router.route('/').get(getCocktails).post(protect, addCocktail).delete(protect, isAdmin, deleteCocktail)
router.route('/:id').get(protect, getCocktailById).put(protect, isAdmin, updateCocktail)
router.route('/:id/reviews').post(protect, addReview).get(protect, getReviews)


export default router