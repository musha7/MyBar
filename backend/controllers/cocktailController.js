import asyncHandler from 'express-async-handler'
import Cocktail from '../models/cocktailModel.js'

// @description Fetch all products
// @route       GET /api/cocktails
// @access      Public
const getCocktails = asyncHandler(async (req, res) => {
    const cocktails = await Cocktail.find({})

    res.json({ cocktails })

})

// @description Fetch all cocktails
// @route       GET /api/cocktails/:id
// @access      Public
const getCocktailById = asyncHandler(async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id)

    if (cocktail) {
        res.json({ cocktail })
    } else {
        res.status(400)
        throw new Error('Cocktail Not Found')
    }
})

export { getCocktails, getCocktailById }