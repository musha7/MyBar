import mongoose from 'mongoose'
import Cocktail from './cocktailModel.js'

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
    alcoholic: {
        type: Boolean,
        required: true
    },

    category: {
        name: { type: String },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CocktailIngredientCategory'
        },
    },
    subCategory: {
        name: { type: String },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CocktailIngredient'
        },
    },
    cocktails: [{
        name: { type: String, required: true },
        image: { type: String },
        cocktail: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cocktail'
        }
    }],

}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export default Ingredient