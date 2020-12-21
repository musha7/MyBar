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

export { getUsers, getUserById }