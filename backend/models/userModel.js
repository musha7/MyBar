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
        name: { type: String, required: true },
        image: { type: String, required: true },
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

}, { timestamps: true });


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)

export default User