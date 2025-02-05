const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const Recipe = require('../models/recipe');
const { recipeSchema } = require('../validationSchemas');

const validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
}));
router.get('/new', (req, res) => {
res.render('recipes/new');
});
router.post('/', validateRecipe, catchAsync (async (req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    req.flash('success', 'New recipe created!');
    res.redirect(`/recipes/${recipe._id}`);
}));
router.get('/:id', catchAsync (async (req, res) => {
const { id } = req.params;
const recipe = await Recipe.findById(id).populate('reviews');
if (!recipe) {
    req.flash('error', 'Recipe not found!');
    return res.redirect('/recipes');
}
res.render('recipes/details', { recipe});
}));
router.get('/:id/edit', catchAsync(async (req, res) => {
const { id } = req.params;
const recipe = await Recipe.findById(id);
if (!recipe) {
    req.flash('error', 'Recipe not found!');
    return res.redirect('/recipes');
}
res.render('recipes/edit', { recipe });
}));
router.put('/:id', validateRecipe, catchAsync (async (req, res) => {
const { id } = req.params;
const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe }, { new: true });
req.flash('success', 'Recipe updated!');
res.redirect(`/recipes/${recipe._id}`);
}));
router.delete('/:id', catchAsync(async (req, res) => {
const { id } = req.params;
await Recipe.findByIdAndDelete(id);
req.flash('success', 'Recipe deleted!');
res.redirect('/recipes');
}));
module.exports = router;