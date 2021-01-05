import asyncHandler from 'express-async-handler'
import Ingredient from '../models/ingredientModel.js'

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

// @description Add a new ingredient to the app
// @route       POST /api/ingredients
// @access      Private
const addIngredient = asyncHandler(async (req, res) => {
    const { name, image, category } = req.body;
    if (name && category) {
        if (await Ingredient.findOne({ name })) {
            res.status(400)
            throw new Error('This Ingredient Is Already In The System')
        }
        else {
            if (!image) {
                if (category === 'no alcohol') {
                    image = '/images/noalcoholdefault.jpg'
                }
                else {
                    image = '/images/alcoholdefault.jpg'
                }
            }
            const newIngredient = new Ingredient({ name: name, image: image, category: category })
            const createdIngredient = await newIngredient.save()
            if (createdIngredient) {
                res.status(200).json({ message: `${name} was added to our bar` })
            } else {
                res.status(400)
                throw new Error('Could Not Create Ingredient')
            }
        }
    }
    else {
        res.status(400)
        throw new Error('Problem with name or category of ingredient')
    }
})


export { getIngredients, getIngredientById, addIngredient }