import asyncHandler from 'express-async-handler'
import Ingredient from '../models/ingredientModel.js'
import User from '../models/userModel.js'

// @description Fetch all ingredients
// @route       GET /api/ingredients
// @access      Public
const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({})

    res.json({ ingredients })
})

// @description Fetch an ingredient by id
// @route       GET /api/ingredients/:id
// @access      Public
const getIngredientById = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id)

    if (ingredient) {
        res.json({ ingredient })
    } else {
        res.status(400)
        throw new Error('Ingredient Not Found')
    }
})

// @description Add ingredient to user's ingredients
// @route       PUT /api/ingredients
// @access      Private
const addIngredientToBar = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findById(req.body.id)
    const user = await User.findById(req.user._id)

    if (user) {
        if (ingredient) {
            if (!user.ingredients.find(ing => ing.ingredient.toString() == ingredient._id.toString())) {
                const ingredientToAdd = { name: ingredient.name, image: ingredient.image, ingredient: ingredient._id }
                user.ingredients.push(ingredientToAdd)
                await user.save()
                res.status(200).send(`${ingredient.name} Was Added To Your Bar`)
            } else {
                res.status(400)
                throw new Error('Ingredient Already In Your Bar')
            }
        } else {
            res.status(400)
            throw new Error('Ingredient Not Found')
        }
    } else {
        res.status(400)
        throw new Error('Not Connected')
    }
})

export { getIngredients, getIngredientById, addIngredientToBar }