import express from 'express'
import { getCocktails, getCocktailById } from '../controllers/cocktailController.js'

const router = express.Router();

router.route('/').get(getCocktails)
router.route('/:id').get(getCocktailById)

export default router