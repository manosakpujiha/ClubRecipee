const Joi = require('joi');
module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        ingredients: Joi.string().required(),
        instructions: Joi.string().required(),
        preptime: Joi.number().required().min(1),
        servings: Joi.number().required().min(1),
        // images: Joi.array().items(Joi.object({
        //     url: Joi.string().required(),
        //     filename: Joi.string().required()
        // })).required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5)
    }).required()
});