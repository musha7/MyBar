import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import cocktails from './data/cocktails.js'
import ingredients from './data/ingredients.js'
import User from './models/userModel.js'
import Cocktail from './models/cocktailModel.js'
import Ingredient from './models/ingredientModel.js'
import Review from './models/reviewModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Cocktail.deleteMany()
        await Ingredient.deleteMany()
        await Review.deleteMany()

        await User.insertMany(users)
        await Cocktail.insertMany(cocktails)
        await Ingredient.insertMany(ingredients)

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

importData();