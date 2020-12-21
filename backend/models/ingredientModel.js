import mongoose from 'mongoose'

const ingredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    cocktails: [{
        cocktail: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Cocktail'
        }
    }],

}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export default Ingredient