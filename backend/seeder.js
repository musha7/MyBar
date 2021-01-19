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

        const createdIngredients = await Ingredient.insertMany(ingredients);
        await User.insertMany(users);
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
            let subCategoryObj = cat.sub_category.map(sub =>
                createdCocktailIngredients.find(f => f.name.toLowerCase() === sub.toLowerCase()))
            subCategoryObj = subCategoryObj.map(cat => ({ name: cat.name, sub_category: cat._id }))
            return {
                ...cat,
                sub_category: subCategoryObj
            }
        })
        const createdCocktailIngredientsCategory = await CocktailIngredientCategory.insertMany(sampleCategoryies);
        //console.log('createdCocktailIngredientsCategory: ', createdCocktailIngredientsCategory)
        // Cocktail Ingredient Update(add categories):
        for (const createdCIngredient of createdCocktailIngredients) {
            let sub_category_name = createdCIngredient.name

            let categoryObj = createdCocktailIngredientsCategory.find(cat => cat.name === sub_category_name.split(' ')[1])
            //console.log('categoryObj: ', categoryObj)
            if (categoryObj) {
                categoryObj = { name: categoryObj.name, category: categoryObj._id }
                createdCIngredient.category = categoryObj
            }
        }
        // const createdCocktailIngredientsUpdated = createdCocktailIngredients.map(createdCIngredient => {
        //     let sub_category_name = createdCIngredient.name

        //     let categoryObj = createdCocktailIngredientsCategory.find(cat => cat.name === sub_category_name.split(' ')[1])
        //     //console.log('categoryObj: ', categoryObj)
        //     if (categoryObj) {
        //         categoryObj = { name: categoryObj.name, category: categoryObj._id }
        //         return {
        //             ...createdCIngredient,
        //             category: categoryObj
        //         }
        //     } else {
        //         return createdCIngredient
        //     }

        // })
        console.log('createdCocktailIngredients: ', createdCocktailIngredients)
        for (const ing of createdCocktailIngredients) {
            await CocktailIngredient.updateOne({ _id: ing._id }, { category: ing.category })
        }
        //const c = await CocktailIngredient.updateMany(createdCocktailIngredients)


        //Cocktails:
        const sampleCocktails = cocktails.map((cocktail) => {
            let cocktailIngredientsObj = cocktail.simpleIngredients.map(ing => (
                createdCocktailIngredients.find(f => f.name.toLowerCase() === ing.toLowerCase())
            ))
            cocktailIngredientsObj = cocktailIngredientsObj.filter(cocktail => cocktail !== undefined)

            // add the not alcoholic ingredients
            for (const ing of cocktail.simpleIngredients) {
                const found = createdIngredients.find(f => f.name.toLowerCase() === ing.toLowerCase())
                if (found) {
                    cocktailIngredientsObj.push(found)
                }
            }

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