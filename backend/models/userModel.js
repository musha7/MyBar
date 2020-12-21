import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


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
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        }
    }],
    cocktails: [{
        cocktail: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Cocktail'
        }
    }],

}, { timestamps: true });

const User = mongoose.model('User', userSchema)

export default User