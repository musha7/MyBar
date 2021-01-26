import mongoose from 'mongoose'

const cocktailIngredientCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subCategory: [{
        name: { type: String, required: true },
        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'CocktailIngredient'
        }
    }]

}, { timestamps: true });

const CocktailIngredientCategory = mongoose.model('CocktailIngredientCategory', cocktailIngredientCategorySchema)

export default CocktailIngredientCategory