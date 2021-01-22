import asyncHandler from 'express-async-handler'
import Cocktail from '../models/cocktailModel.js'
import User from '../models/userModel.js'
import Ingredient from '../models/ingredientModel.js'
import CocktailIngredient from '../models/cocktailIngredientModel.js'

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
                    // let allIngredientsFromDb = await Ingredient.find({})
                    // let cocktailIngredients = await CocktailIngredient.find({})
                    // cocktailIngredients = cocktailIngredients.concat(allIngredientsFromDb)
                    // console.log('cocktailIngredients: ', cocktailIngredients);

                    // const ingredientsFromDB = filterdIngredients.map(ingredient => {
                    //     const foundIngredient = allIngredientsFromDb.find(ing => ing.name.toString() === ingredient.toString())
                    //     if (foundIngredient) {
                    //         return foundIngredient
                    //     }
                    //     else {
                    //         res.status(400)
                    //         throw new Error(`Could not find ${ingredient.name} in the system, add ${ingredient.name} to the ingredients first`)
                    //     }
                    // })
                    let ingredientsFromDB = []
                    for (const ingredient of filterdIngredients) {
                        let foundIngredient = await Ingredient.findOne({ name: ingredient })
                        if (foundIngredient) {
                            ingredientsFromDB.push(foundIngredient)

                            //ingredientsFromDB.push({ name: foundIngredient.name, image: foundIngredient.image, ingredient: foundIngredient._id })
                        } else {
                            foundIngredient = await CocktailIngredient.findOne({ name: ingredient })
                            if (foundIngredient) {
                                ingredientsFromDB.push(foundIngredient)
                                // if (foundIngredient.category.name) {
                                //     const category = { name: foundIngredient.category.name, category: foundIngredient.category.category }
                                //     ingredientsFromDB.push({ name: foundIngredient.name, image: foundIngredient.image, category: category, ingredient: foundIngredient._id })
                                // }
                                // else {
                                //     ingredientsFromDB.push({ name: foundIngredient.name, image: foundIngredient.image, ingredient: foundIngredient._id })
                                // }
                            }
                            else {
                                res.status(400)
                                throw new Error(`Could not find ${ingredient.name} in the system, add ${ingredient.name} to the ingredients first`)
                            }
                        }
                    }

                    console.log('ingredientsFromDB: ', ingredientsFromDB);
                    const ingredientsForCocktail = ingredientsFromDB.map(ingredient => {
                        if (ingredient.category.name) {
                            const category = { name: ingredient.category.name, category: ingredient.category.category }
                            return ({ name: ingredient.name, image: ingredient.image, category: category, ingredient: ingredient._id })
                        }
                        else {
                            return { name: ingredient.name, image: ingredient.image, ingredient: ingredient._id }
                        }

                    })
                    const newCocktail = new Cocktail({ name: name, rating: 0, numReviews: 0, image: image, ingredients: ingredientsForCocktail, steps: filterdSteps })
                    const createdCocktail = await newCocktail.save()

                    //add cocktail to all its ingredients
                    for (const ingredient of ingredientsFromDB) {
                        if (ingredient.cocktails) {
                            ingredient.cocktails.push({ name: createdCocktail.name, image: createdCocktail.image, cocktail: createdCocktail._id })
                            await ingredient.save()
                        }
                    }

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

// @description Delete cocktail by id
// @route       DELETE /api/cocktails
// @access      Private, Admin
const deleteCocktail = asyncHandler(async (req, res) => {
    console.log('here:');
    const cocktail = await Cocktail.findById(req.body.id)
    console.log('cocktail: ', cocktail);
    if (cocktail) {
        const cocktailIngredients = cocktail.ingredients
        for (const ingredient of cocktailIngredients) {
            const currIng = await Ingredient.findById(ingredient.ingredient)
            if (currIng) {
                currIng.cocktails = currIng.cocktails.filter(c => c.cocktail.toString() !== cocktail._id.toString())
                await currIng.save();
            }

        }

        const deleted = await Cocktail.deleteOne({ _id: cocktail._id })
        if (deleted) {
            res.status(200).json({ message: 'Successfully deleted' })
        } else {
            res.status(401)
            throw new Error('Could not delete Cocktail')
        }
    } else {
        res.status(401)
        throw new Error('Cocktail not found, could not delete')
    }
})

// @description Fetch the yop rated products
// @route       GET /api/cocktails/top
// @access      Public
const getTopRatedCocktails = asyncHandler(async (req, res) => {
    const cocktails = await Cocktail.find({}).sort('-rating').limit(3)
    res.json({ cocktails })
})

export { getCocktails, getCocktailById, addReview, getReviews, addCocktail, deleteCocktail, getTopRatedCocktails }