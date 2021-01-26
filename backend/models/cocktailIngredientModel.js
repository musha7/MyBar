import mongoose from 'mongoose'

const cocktailIngredientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        name: { type: String },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CocktailIngredientCategory'
        }
    },
    ingredients: [{
        name: { type: String, required: true },
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        }
    }]

}, { timestamps: true });

const CocktailIngredient = mongoose.model('CocktailIngredient', cocktailIngredientSchema)

export default CocktailIngredient