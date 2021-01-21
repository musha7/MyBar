import asyncHandler from 'express-async-handler'
import Ingredient from '../models/ingredientModel.js'
import Cocktail from '../models/cocktailModel.js'
import CocktailIngredient from '../models/cocktailIngredientModel.js'

// @description Fetch all ingredients
// @route       GET /api/ingredients
// @access      Public
const getIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({}).sort('-category').sort('-subCategory').sort('name')

    res.json({ ingredients })
})

// @description Fetch all cocktail ingredients
// @route       GET /api/ingredients/cocktailIngredients
// @access      Public
const getCocktailIngredients = asyncHandler(async (req, res) => {
    const cocktailIngredients = await CocktailIngredient.find({}).sort('-category').sort('name')

    res.json({ cocktailIngredients })
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
    const { name, image, alcoholic, subCategory } = req.body;
    let sub = undefined
    if (subCategory) {
        sub = await CocktailIngredient.findOne({ name: subCategory })
    }
    if (name) {
        if (await Ingredient.findOne({ name })) {
            res.status(400)
            throw new Error('This Ingredient Is Already In The System')
        }
        else {
            if (!image) {
                if (!alcoholic) {
                    image = '/images/noalcoholdefault.jpg'
                }
                else {
                    image = '/images/alcoholdefault.jpg'
                }
            }
            // Add new ingredient to all relevant cocktails
            let cocktails = await Cocktail.find({})
            let found
            const liqueur = await CocktailIngredient.findOne({ name: 'Liqueur' })
            cocktails = cocktails.map(cocktail => {
                found = undefined
                cocktail.ingredients.forEach(ingredient => {
                    //console.log('ingredient: ', ingredient)

                    if (sub) {
                        if (ingredient.ingredient.toString() !== liqueur._id.toString() && ingredient.ingredient.toString() === sub._id.toString()) {
                            found = { name: cocktail.name, image: cocktail.image, cocktail: cocktail._id }
                        }
                        else {
                            if (ingredient.category.category && ingredient.category.category.toString() === sub.category.category.toString()) {
                                found = { name: cocktail.name, image: cocktail.image, cocktail: cocktail._id }
                            }
                        }

                    } else {
                        if (ingredient.name === name) {
                            found = { name: cocktail.name, image: cocktail.image, cocktail: cocktail._id }
                        }
                    }
                });
                return found
            })
            cocktails = cocktails.filter(cocktail => cocktail !== undefined)
            console.log('cocktails:', cocktails);
            let ingsub;
            let ingcat;
            if (sub) {
                ingsub = { name: sub.name, subCategory: sub._id }
                if (sub.category) {
                    ingcat = { name: sub.category.name, category: sub.category.category }
                }
            }
            const newIngredient = new Ingredient({ name: name, image: image, alcoholic: alcoholic, category: ingcat, subCategory: ingsub, cocktails: cocktails })
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

// @description Fetch all ingredients
// @route       GET /api/ingredients
// @access      Public
const getTopUsedIngredients = asyncHandler(async (req, res) => {
    const ingredients = await Ingredient.find({})
    const cocktails = await Cocktail.find({})
    let ingredientMap = new Map()
    ingredients.forEach(ingredient => {
        if (!ingredientMap.has(ingredient.name)) {
            ingredientMap.set(ingredient.name, 0)
        }
    });
    cocktails.forEach(cocktail => {
        cocktail.ingredients.forEach(ingredient => {
            if (ingredientMap.has(ingredient.name)) {
                ingredientMap.set(ingredient.name, ingredientMap.get(ingredient.name) + 1)
            }
        });
    });
    console.log(ingredientMap);

    res.json({ ingredients })
})

export { getIngredients, getCocktailIngredients, getIngredientById, addIngredient, deleteIngredient, getTopUsedIngredients }