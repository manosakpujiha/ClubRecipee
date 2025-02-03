const mongoose = require('mongoose');
const reviews = require('./reviews');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    description : String,
    ingredients: String,
    instructions: String,
    preptime: Number, // Preparation time in minutes
    servings: Number, // Number of servings the recipe yields
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]   
});

RecipeSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await reviews.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema); // Export the model so that it can be used in other files