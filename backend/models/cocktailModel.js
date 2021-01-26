import mongoose from 'mongoose'
import Ingredient from './ingredientModel.js'
import reviewSchema from './reviewModel.js'

const cocktailSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  reviews: [
    {
      rating: { type: Number, required: true, },
      comment: { type: String, required: true },
      user_name: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
    }],
  // ingredients: [
  //   {
  //     name: { type: String, required: true },
  //     image: { type: String, required: true },
  //     sub_category: { type: String },
  //     ingredient: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: true,
  //       ref: 'Ingredient'
  //     }
  //   }
  // ],
  ingredients: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      category: {
        name: { type: String },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CocktailIngredientCategory'
        },
      },
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CocktailIngredient'
      },
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
      }
    }
  ],
  steps: [{
    type: String,
    required: true
  }],
}, { timestamps: true });

const Cocktail = mongoose.model('Cocktail', cocktailSchema)

export default Cocktail