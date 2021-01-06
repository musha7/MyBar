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
        await User.deleteMany();
        await Cocktail.deleteMany();
        await Ingredient.deleteMany();
        //await Review.deleteMany();

        const createdingredients = await Ingredient.insertMany(ingredients);
        await User.insertMany(users);

        const sampleCocktails = cocktails.map((cocktail) => {
            const cocktailIngredientsObj = cocktail.simpleIngredients.map(ing => (
                createdingredients.find(f => f.name.toLowerCase() === ing.toLowerCase())
            ))
            const cocktailIngredients = cocktailIngredientsObj.map(i => (
                { name: i.name, image: i.image, sub_category: i.sub_category, ingredient: i._id }
            ))
            return {
                ...cocktail,
                ingredients: cocktailIngredients
            }
        })
        await Cocktail.insertMany(sampleCocktails);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

importData();