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

    // category: {
    //     type: String,
    // },
    category: {
        name: { type: String },
        category: {
            type: mongoose.Schema.Types.ObjectId,

            ref: 'CocktailIngredientCategory'
        }
    },
    ingredients: [{
        name: { type: String, required: true },
        //image: { type: String, required: true },
        ingredient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ingredient'
        }
    }]
    // cocktails: [{
    //     name: { type: String, required: true },
    //     image: { type: String, required: true },
    //     cocktail: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Cocktail'
    //     }
    // }],

}, { timestamps: true });

const CocktailIngredient = mongoose.model('CocktailIngredient', cocktailIngredientSchema)

export default CocktailIngredient