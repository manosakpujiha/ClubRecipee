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
    images: [{ 
        url: String, 
        filename: String 
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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

module.exports = mongoose.model('Recipe', RecipeSchema); 