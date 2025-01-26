const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    description : String,
    ingredients: String,
    instructions: String,
    preptime: Number, // Preparation time in minutes
    servings: Number, // Number of servings the recipe yields
    image: String
});


module.exports = mongoose.model('Recipe', RecipeSchema); // Export the model so that it can be used in other files