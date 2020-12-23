import User from '../models/userModel.js'
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'



const protect = asyncHandler(async (req, res, next) => {
    const [start, token] = req.headers.authorization.split(' ');
    console.log('start:', start);
    console.log('token:', token);
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
})

export { protect }