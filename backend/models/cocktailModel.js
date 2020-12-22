import mongoose from 'mongoose'
import { reviewSchema } from './reviewModel.js'
import Ingredient from './ingredientModel.js'

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
  reviews: [reviewSchema],
  ingredients: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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