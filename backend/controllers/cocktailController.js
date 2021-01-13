import asyncHandler from 'express-async-handler'
import Cocktail from '../models/cocktailModel.js'
import User from '../models/userModel.js'
import Ingredient from '../models/ingredientModel.js'

// @description Fetch all products
// @route       GET /api/cocktails
// @access      Public
const getCocktails = asyncHandler(async (req, res) => {
    const cocktails = await Cocktail.find({})

    res.json({ cocktails })

})

// @description Get a cocktails by id
// @route       GET /api/cocktails/:id
// @access      Public
const getCocktailById = asyncHandler(async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id)
    cocktail.ingredients.sort((a, b) => a.category < b.category ? -1 : 1)
    if (cocktail) {
        res.json({ cocktail })
    } else {
        res.status(400)
        throw new Error('Cocktail Not Found')
    }
})

// @description Add a new review for a cocktail
// @route       POST /api/cocktails/:id/reviews
// @access      Private
const addReview = asyncHandler(async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id)
    const user = await User.findById(req.user._id)
    const { rating, comment } = req.body
    if (user) {
        if (cocktail) {
            if (!cocktail.reviews.find(rev => rev.user.toString() === user._id.toString())) {
                if (rating && comment) {
                    const reviewForCocktail = { rating, comment, user: user._id, user_name: user.name }
                    const reviewForUser = { rating, comment, cocktail: cocktail._id, cocktail_name: cocktail.name, cocktail_image: cocktail.image }
                    if (cocktail.reviews.length === 0) {
                        cocktail.numReviews = 1
                        cocktail.rating = rating
                    } else {
                        const numReviews = cocktail.numReviews
                        cocktail.rating = (numReviews * cocktail.rating + rating) / (numReviews + 1)
                        cocktail.numReviews = numReviews + 1
                    }
                    cocktail.reviews.push(reviewForCocktail)
                    await cocktail.save()
                    user.reviews.push(reviewForUser)
                    await user.save()
                    res.status(201).json({ message: `Your Review Was Added` })
                } else {
                    res.status(400)
                    throw new Error('Bad Review')
                }
            } else {
                res.status(400)
                throw new Error('You already made a review for this cocktail. You can change it in your profile')
            }

        } else {
            res.status(404)
            throw new Error('Cocktail Not Found')
        }
    }
    else {
        res.status(401)
        throw new Error('Not Connected')
    }
})

// @description Get all reviews for a cocktail
// @route       GET /api/cocktails/:id/reviews
// @access      Private
const getReviews = asyncHandler(async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id)
    if (cocktail) {
        const reviews = cocktail.reviews
        res.status(200).json({ reviews })
    } else {
        res.status(401)
        throw new Error('Cocktail Not Found')
    }
})

// @description Add a new cocktail to the app
// @route       POST /api/cocktails
// @access      Private
const addCocktail = asyncHandler(async (req, res) => {
    const { name, image, ingredients, steps } = req.body
    const filterdIngredients = ingredients.filter(ing => ing !== '')
    const filterdSteps = steps.filter(step => step !== '')
    if (name) {
        if (await Cocktail.findOne({ name })) {
            res.status(400)
            throw new Error('This Cocktail Is Already In The System')
        }
        else {
            console.log(ingredients);
            if (filterdIngredients.length === 0) {
                res.status(400)
                throw new Error('Add ingredients ')
            }
            else {
                if (filterdSteps.length === 0) {
                    res.status(400)
                    throw new Error('Add steps')
                }
                else {
                    const allIngredientsFromDb = await Ingredient.find({})
                    const ingredientsFromDB = filterdIngredients.map(ingredient => {
                        const foundIngredient = allIngredientsFromDb.find(ing => ing.name.toString() === ingredient.toString())
                        if (foundIngredient) {
                            return foundIngredient
                        }
                        else {
                            res.status(400)
                            throw new Error(`Could not find ${ingredient.name} in the system, add ${ingredient.name} to the ingredients first`)
                        }
                    })
                    const ingredientsForCocktail = ingredientsFromDB.map(ingredient => {
                        return { name: ingredient.name, image: ingredient.image, sub_category: ingredient.sub_category, ingredient: ingredient._id }
                    })
                    const newCocktail = new Cocktail({ name: name, rating: 0, numReviews: 0, image: image, ingredients: ingredientsForCocktail, steps: filterdSteps })
                    const createdCocktail = await newCocktail.save()
                    if (createdCocktail) {
                        res.status(200).json({ id: createdCocktail._id, name: createdCocktail.name, message: `${name} was added to our bar` })
                    } else {
                        res.status(400)
                        throw new Error('Could Not Create Cocktail')
                    }
                }
            }
        }
    }
    else {
        res.status(400)
        throw new Error('Problem with name of cocktail')
    }
})

export { getCocktails, getCocktailById, addReview, getReviews, addCocktail }