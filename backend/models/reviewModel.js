import mongoose from 'mongoose'
import User from './userModel.js'
import Cocktail from './cocktailModel.js'

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cocktail_name: { type: String, },
    cocktail_image: { type: String, },
    cocktail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cocktail'
    },
}, { timestamps: true });

//const Review = mongoose.model('Review', reviewSchema)

export default reviewSchema 