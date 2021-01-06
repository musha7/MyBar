import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import reviewSchema from './reviewModel.js'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    ingredients: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        sub_category: { type: String },
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        }
    }],
    cocktails: [{
        name: { type: String, required: true },
        image: { type: String, required: true },
        cocktail: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Cocktail'
        }
    }],
    reviews: [reviewSchema],    //     {
    //     rating: { type: Number, required: true, },
    //     comment: { type: String, required: true },
    //     review: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Review'
    //     },
    //     cocktailName: { type: String, required: true },
    //     cocktailImage: { type: String, required: true },
    //     cocktail: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Cocktail'
    //     }
    // }

}, { timestamps: true });


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)

export default User