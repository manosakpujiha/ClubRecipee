const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const { isCreator, validateRecipe, isLoggedIn } = require('../middleware');
const Recipe = require('../models/recipe');

router.get('/', catchAsync(async (req, res, next) => {
    const recipes = await Recipe.find({}).populate('creator');
    res.render('recipes/index', { recipes });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('recipes/new');
});

router.post('/', isLoggedIn, validateRecipe, catchAsync (async (req, res, next) => {
    const recipe = new Recipe(req.body.recipe);
    recipe.creator = req.user._id;
    await recipe.save();
    req.flash('success', 'New recipe created!');
    res.redirect(`/recipes/${recipe._id}`);
}));

router.get('/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'creator'
        }
    }).populate('creator');
    // console.log(recipe);
    if (!recipe) {
        req.flash('error', 'Recipe not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/details', { recipe});
}));

router.get('/:id/edit', isLoggedIn, isCreator, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        req.flash('error', 'Recipe not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
}));

router.put('/:id', isLoggedIn, isCreator, validateRecipe, catchAsync (async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe }, { new: true });
    req.flash('success', 'Recipe updated!');
    res.redirect(`/recipes/${recipe._id}`);
}));

router.delete('/:id', isLoggedIn, isCreator, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    req.flash('success', 'Recipe deleted!');
    res.redirect('/recipes');
}));

module.exports = router;