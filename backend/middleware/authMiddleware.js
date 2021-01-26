import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    const auth = req.headers.authorization
    if (auth) {
        const [start, token] = auth.split(' ');
        if (token && start === 'Bearer') {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password')
                next()
            } catch (error) {
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }
        if (!token) {
            res.status(401)
            throw new Error('Token is not valid')
        }
    } else {
        res.status(401)
        throw new Error('No Authorization')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (user && user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
})

export { protect, isAdmin }