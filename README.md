# MyBar
Bar application by Michael Shlezinger 

Built with the MERN stack - Node.js, Express, Mongoose, React & Redux.

Website : https://michaelmybar.herokuapp.com/

A bar application where you can create your own bar with the ingredients you have at home. The app will give you the cocktails you can create with what you have.
You can add new ingredients and cocktails to the app, that way everyone will see them. You can also review cocktails, and later on change your reviews in your profile if you changed your opinion about the cocktail

![Screenshot 2021-01-22 144829](https://user-images.githubusercontent.com/44841173/105493554-3656c880-5cc2-11eb-8475-942f1d535ff8.png)


# Features:
- Cocktails with the needed ingredients to make them and the steps.
- Option to write a comment and rate cocktails, see what others commented.
- User profile info and his cocktails reviews.
- MyIngredients- all the ingredinets the user has are saved.
- MyCocktails - all the cocktails a user can create with his ingredients.
- Option to add new ingredients and cocktails to the app.
- Admin options: manage users, ingredinets, cocktails.
- Database seeder - to get the first users, ingredients and cocktails

## Install Dependencies (frontend & backend):
npm install

cd frontend

npm install

## Env Variables:
Create a .env file in then root and add the following

NODE_ENV = development

PORT = 5000

MONGO_URI = your mongodb uri

JWT_SECRET = 'c9b8a7'

## Run:
Run frontend (:3000) & backend (:5000):

npm run dev

Run backend only

npm run server

## Seed Database:
You can use the following command to seed the database with some sample users ingredients and cocktails

Import data:
npm run data:import
