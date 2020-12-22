import asyncHandler from 'express-async-handler'
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
    console.log('req:', req.body);
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
                //token: generateToken(user._id)
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

export { getUsers, login }