const Joi = require('joi');
module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        ingredients: Joi.string().required(),
        instructions: Joi.string().required(),
        preptime: Joi.number().required().min(1),
        servings: Joi.number().required().min(1),
        image: Joi.string().required()
    }).required()
});