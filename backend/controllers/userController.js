import asyncHandler from 'express-async-handler'
import generateToken from '../generateToken.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import Ingredient from '../models/ingredientModel.js'
import Cocktail from '../models/cocktailModel.js'

// @description Fetch all users
// @route       GET /api/users
// @access      Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json({ users })
})

// @description Fetch an user by id
// @route       GET /api/users/:id
// @access      Public
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json({ user })
    } else {
        res.status(400)
        throw new Error('User Not Found')
    }
})

// @description Auth user and get token
// @route       POST /api/users/login
// @access      Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (user) {
        if (await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                cocktails: user.cocktails,
                ingredients: user.ingredients,
                //reviews: user.reviews,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Invalid password')
        }
    } else {
        res.status(401)
        throw new Error('Invalid email')
    }

})

// @description Register new user
// @route       POST /api/users/register
// @access      Public
const register = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    if (await User.findOne({ email })) {
        res.status(400)
        throw new Error('This Email Is Already Registered')
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const incryptedPassword = await bcrypt.hash(password, salt)

        const user = new User({ email: email, name: name, password: incryptedPassword, cocktails: [], ingredients: [], isAdmin: false })
        const createdUser = await user.save()

        if (createdUser) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                cocktails: user.cocktails,
                ingredients: user.ingredients,
                reviews: user.reviews,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    }
})


// @description Delete user by id
// @route       DELETE /api/users
// @access      Private, Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id)
    if (user) {
        const deleted = await User.deleteOne({ _id: user._id })
        if (deleted) {
            res.status(200)
            res.send('Successfully deleted')
        } else {
            res.status(401)
            throw new Error('Could not delete user')
        }
    } else {
        res.status(401)
        throw new Error('User not found, could not delete')
    }

})

// @description Get logged in user profile
// @route       GET /api/users/profile
// @access      Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            //cocktails: user.cocktails,
            ingredients: user.ingredients,
            reviews: user.reviews,
        })
    } else {
        res.status(401)
        throw new Error('User Not Found')
    }
})


// @description Update user profile
// @route       PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { email, name, password } = req.body
    if (user) {
        user.email = email || user.email
        user.name = name || user.name
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const incryptedPassword = await bcrypt.hash(password, salt)
            user.password = incryptedPassword
        }
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // cocktails: user.cocktails,
            ingredients: user.ingredients,
            reviews: user.reviews,
        })
    } else {
        res.status(401)
        throw new Error('User Not Found')
    }
})

// @description Add ingredient to user's ingredients
// @route       PUT /api/users/ingredients
// @access      Private
const addIngredientToUser = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findById(req.body.id)
    const user = await User.findById(req.user._id)

    if (user) {
        if (ingredient) {
            if (!user.ingredients.find(ing => ing.ingredient.toString() == ingredient._id.toString())) {
                const ingredientToAdd = { name: ingredient.name, image: ingredient.image, sub_category: ingredient.sub_category, ingredient: ingredient._id }
                user.ingredients.push(ingredientToAdd)
                await user.save()
                res.status(200).json({ message: `${ingredient.name} Was Added To Your Bar` })
            } else {
                res.status(400)
                throw new Error(`${ingredient.name} Is Already In Your Bar`)
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

// @description Remove ingredient from user's ingredients
// @route       DELETE /api/users/ingredients
// @access      Private
const removeIngredientFromUser = asyncHandler(async (req, res) => {
    const ingredient = await Ingredient.findById(req.body.id)
    const user = await User.findById(req.user._id)

    if (user) {
        if (ingredient) {
            const indexForRemove = user.ingredients.findIndex(ing => ing.ingredient.toString() == ingredient._id.toString())
            if (indexForRemove > -1) {
                user.ingredients.splice(indexForRemove, 1)
                await user.save()
                res.status(200).json({ message: `${ingredient.name} Was Removed From Your Bar` })
            } else {
                res.status(400)
                throw new Error(`You Dont Have ${ingredient.name} In Your Bar`)
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

// @description Get user's cocktails according to his ingredients
// @route       GET /api/users/cocktails
// @access      Private
const getUserCocktails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const userIngredients = user.ingredients
    const allCocktails = await Cocktail.find({})
    // const currUserCocktails = user.cocktails
    // const cocktailsToCheck = allCocktails.filter((cocktail)=> {
    //     if(currUserCocktails.find((c)=> cocktail._id.toString()===c.cocktail.toString())){
    //         return false
    //     }
    //     return true
    // })

    let newUsersCocktails = []
    if (user) {
        if (userIngredients) {
            // go through all available cocktails.
            // for each go through thier ingredients,
            // and check if all of them are present in the user ingredients(or an ingredient from the same category)
            newUsersCocktails = allCocktails.filter((cocktail) => {
                const numOfIngs = cocktail.ingredients.length
                const presentIngredients = cocktail.ingredients.filter((ing) => {
                    if (userIngredients.find((userIng => {





                        if (userIng.ingredient.toString() === ing.ingredient.toString()) {
                            return true
                        }
                        else {
                            if (ing.sub_category && ing.sub_category !== 'Liquer' && ing.sub_category === userIng.sub_category) {
                                //same alcohol category but a different kind of brand
                                return true;
                            }
                            //}
                        }
                        return false
                    }))) {
                        return true
                    }
                    return false
                })
                if (numOfIngs === presentIngredients.length) {
                    return true
                }
                return false
            })
            if (newUsersCocktails) {
                user.cocktails = newUsersCocktails.map(newCocktail => { return { name: newCocktail.name, image: newCocktail.image, cocktail: newCocktail._id } })
                await user.save()
            }
            if (user.cocktails.length === 0) {
                res.status(400)
                throw new Error('Sorry, You Do Not Have Enough Ingredients For Any Of Our Current Cocktails')
            }
            res.status(200).json({ cocktails: user.cocktails })
        } else {
            res.status(400)
            throw new Error('No Ingredients In Your Bar')
        }
    }
    else {
        res.status(400)
        throw new Error('Not Connected')
    }


})

// @description Get all user's reviews 
// @route       GET /api/users/reviews
// @access      Private
const getMyReviews = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        const reviews = user.reviews
        res.status(200).json({ reviews })
    } else {
        res.status(400)
        throw new Error('Not Connected')
    }
})

// @description Update user's review
// @route       PUT /api/users/reviews
// @access      Private
const updateReview = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const { reviewId, rating, comment } = req.body
    if (user) {
        const userReview = user.reviews.find((rev => rev._id.toString() === reviewId.toString()))
        const cocktail = await Cocktail.findById(userReview.cocktail)
        console.log('userReview: ', userReview);
        if (cocktail) {
            userReview.rating = rating || userReview.rating
            userReview.comment = comment || userReview.comment
            await user.save();
            const cocktailReview = cocktail.reviews.find((rev => rev.user.toString() === user._id.toString()))
            console.log('cocktailReview: ', cocktailReview);
            cocktailReview.rating = rating || cocktailReview.rating
            cocktailReview.comment = comment || cocktailReview.comment
            await cocktail.save();
            res.status(200).json({ message: 'Review Updated' })
        } else {
            res.status(400)
            throw new Error('Cocktail Not Found')
        }
    }
    else {
        res.status(401)
        throw new Error('Not Connected')
    }
})

export {
    getUsers, login, getUserProfile, register, deleteUser, getUserById,
    updateUserProfile, addIngredientToUser, removeIngredientFromUser,
    getUserCocktails, getMyReviews, updateReview
}