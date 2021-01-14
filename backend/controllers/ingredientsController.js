import asyncHandler from 'express-async-handler'
import Ingredient from '../models/ingredientModel.js'

// @description Fetch all ingredients
// @route       GET /api/ingredients
// @access      Public
const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({}).sort('sub_category').sort('name')

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
    const { name, image, category, sub_category } = req.body;
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
            const newIngredient = new Ingredient({ name: name, image: image, category: category, sub_category: sub_category })
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

// @description Delete ingredient by id
// @route       DELETE /api/ingredients
// @access      Private, Admin
const deleteIngredient = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findById(req.body.id)
    if (ingredient) {
        const deleted = await Ingredient.deleteOne({ _id: ingredient._id })
        if (deleted) {
            res.status(200).json({ message: 'Successfully deleted' })
        } else {
            res.status(401)
            throw new Error('Could not delete ingredient')
        }
    } else {
        res.status(401)
        throw new Error('Ingredient not found, could not delete')
    }
})

export { getIngredients, getIngredientById, addIngredient, deleteIngredient }