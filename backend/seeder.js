import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import cocktails from './data/cocktails.js'
import cocktailIngredients from './data/cocktailIngredients.js'
import cocktailIngredientCategory from './data/cocktailIngredientCategory.js'
import ingredients from './data/ingredients.js'
import User from './models/userModel.js'
import Cocktail from './models/cocktailModel.js'
import Ingredient from './models/ingredientModel.js'
import CocktailIngredient from './models/cocktailIngredientModel.js'
import CocktailIngredientCategory from './models/cocktailIngredientCategoryModel.js'
import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
    try {
        await User.deleteMany();
        await Cocktail.deleteMany();
        await Ingredient.deleteMany();

        await CocktailIngredient.deleteMany();
        await CocktailIngredientCategory.deleteMany();

        await User.insertMany(users);

        const createdIngredients = await Ingredient.insertMany(ingredients);

        // Cocktail Ingredient:
        const sampleCocktailIngredients = cocktailIngredients.map(cIngredinet => {
            const ingredientsObj = cIngredinet.ingredients.map(ing =>
                createdIngredients.find(f => f.name.toLowerCase() === ing.toLowerCase()))

            const cocktailIngs = ingredientsObj.map(i => ({ name: i.name, ingredient: i._id }))
            return {
                ...cIngredinet,
                ingredients: cocktailIngs,
                category: {}
            }
        })
        const createdCocktailIngredients = await CocktailIngredient.insertMany(sampleCocktailIngredients);

        // Cocktail Ingredient Category:
        const sampleCategoryies = cocktailIngredientCategory.map(cat => {
            let subCategoryObj = cat.subCategory.map(sub =>
                createdCocktailIngredients.find(f => f.name.toLowerCase() === sub.toLowerCase()))
            subCategoryObj = subCategoryObj.map(cat => ({ name: cat.name, subCategory: cat._id }))
            return {
                ...cat,
                subCategory: subCategoryObj
            }
        })
        const createdCocktailIngredientsCategory = await CocktailIngredientCategory.insertMany(sampleCategoryies);

        // Cocktail Ingredient Update(add categories):
        for (const createdCIngredient of createdCocktailIngredients) {
            let subCategory_name = createdCIngredient.name
            let categoryObj = createdCocktailIngredientsCategory.find(cat => cat.name === subCategory_name.split(' ')[1])
            if (categoryObj) {
                categoryObj = { name: categoryObj.name, category: categoryObj._id }
                await CocktailIngredient.updateOne({ _id: createdCIngredient._id }, { category: categoryObj })
            }
        }

        // Ingredient Update(add categories and sub categories):
        for (const ingredient of createdIngredients) {
            if (ingredient.subCategory.name) {
                let subCategoryObj = createdCocktailIngredients.find(sub => sub.name === ingredient.subCategory.name)
                subCategoryObj = { name: subCategoryObj.name, subCategory: subCategoryObj._id }
                //console.log('subCategoryObj:', subCategoryObj);
                await Ingredient.updateOne({ _id: ingredient._id }, { subCategory: subCategoryObj })
            }
            if (ingredient.category.name) {
                let categoryObj = createdCocktailIngredientsCategory.find(cat => cat.name === ingredient.category.name)
                categoryObj = { name: categoryObj.name, category: categoryObj._id }
                await Ingredient.updateOne({ _id: ingredient._id }, { category: categoryObj })
            }
        }

        //Cocktails:
        const updatedIngredients = await Ingredient.find({})
        const updatedCocktailIngredients = await CocktailIngredient.find({})
        const sampleCocktails = cocktails.map((cocktail) => {
            let cocktailIngredientsObj = cocktail.simpleIngredients.map(ing => {
                const foundCocktailIngredient = updatedCocktailIngredients.find(f => f.name.toLowerCase() === ing.toLowerCase())
                if (foundCocktailIngredient) { // add the alcoholic ingredients
                    return foundCocktailIngredient
                }
                else { // add the not alcoholic ingredients
                    return updatedIngredients.find(f => f.name.toLowerCase() === ing.toLowerCase())
                }
            })
            //cocktailIngredientsObj = cocktailIngredientsObj.filter(cocktail => cocktail !== undefined)

            const cocktailIngredients = cocktailIngredientsObj.map(i => {
                if (i.category) {
                    return { name: i.name, image: i.image, category: i.category, ingredient: i._id }
                } else {
                    return { name: i.name, image: i.image, ingredient: i._id }
                }
            })
            return {
                ...cocktail,
                ingredients: cocktailIngredients
            }
        })
        const createdCocktail = await Cocktail.insertMany(sampleCocktails);
        for (const ingredient of updatedIngredients) {
            let foundCocktails = []

            const ingredientCocktails = ingredients.find(ing => ing.name === ingredient.name)
            console.log('ingredientCocktails: ', ingredientCocktails);
            for (const cocktail of ingredientCocktails.simpleCocktails) {

                let foundCocktail = createdCocktail.find(c => c.name === cocktail)
                console.log('foundCocktail: ', foundCocktail);
                if (foundCocktail) {
                    foundCocktail = { name: foundCocktail.name, image: foundCocktail.image, cocktail: foundCocktail._id }
                    foundCocktails.push(foundCocktail)
                }
            }
            console.log('foundCocktails: ', foundCocktails);
            await Ingredient.updateOne({ _id: ingredient._id }, { cocktails: foundCocktails })
        }

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

importData();