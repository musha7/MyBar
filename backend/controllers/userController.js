import asyncHandler from 'express-async-handler'
import generateToken from '../generateToken.js'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

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
        })
    } else {
        res.status(401)
        throw new Error('User Not Found')
    }
})

// @description Register new user
// @route       POST /api/users/register
// @access      Public
const register = asyncHandler(async (req, res) => {
    const { email, name, password, reEnteredPassword } = req.body;
    if (await User.findOne({ email })) {
        res.status(400)
        throw new Error('This Email Is Already Registered')
    }
    else {
        if (password === reEnteredPassword) {
            const salt = await bcrypt.genSalt(10)
            const incryptedPassword = await bcrypt.hash(password, salt)

            const user = new User({ email: email, name: name, password: incryptedPassword, cocktails: [], ingredients: [], isAdmin: false })
            const createdUser = await user.save()
            const token = generateToken(user._id)

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
        } else {
            res.status(401)
            throw new Error('Passwords Do Not Match')
        }
    }
})


export { getUsers, login, getUserProfile, register }