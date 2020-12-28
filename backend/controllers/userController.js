import asyncHandler from 'express-async-handler'
import generateToken from '../generateToken.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import Ingredient from '../models/ingredientModel.js'

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
            cocktails: user.cocktails,
            ingredients: user.ingredients,
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
            cocktails: user.cocktails,
            ingredients: user.ingredients,
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
                const ingredientToAdd = { name: ingredient.name, image: ingredient.image, ingredient: ingredient._id }
                user.ingredients.push(ingredientToAdd)
                await user.save()
                res.status(200).send(`${ingredient.name} Was Added To Your Bar`)
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
                res.status(200).send(`${ingredient.name} Was Removed From Your Bar`)
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
export { getUsers, login, getUserProfile, register, deleteUser, getUserById, updateUserProfile, addIngredientToUser, removeIngredientFromUser }