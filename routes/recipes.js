const express = require('express');
const router = express.Router();
const recipeControllers = require('../controllers/recipes');
const catchAsync = require('../helpers/catchAsync');
const { isCreator, validateRecipe, isLoggedIn } = require('../middleware');

router.route('/')
    .get(catchAsync(recipeControllers.viewAllRecipesPage))
    .post(isLoggedIn, validateRecipe, catchAsync (recipeControllers.createNewRecipeData));

router.get('/new', isLoggedIn, recipeControllers.viewNewRecipePage);            

router.route('/:id')
    .get(catchAsync(recipeControllers.viewRecipeDetailsPage))
    .put(isLoggedIn, isCreator, validateRecipe, catchAsync(recipeControllers.editRecipeData))
    .delete(isLoggedIn, isCreator, catchAsync(recipeControllers.deleteRecipeData));

router.get('/:id/edit', isLoggedIn, isCreator, catchAsync(recipeControllers.viewEditRecipePage));

module.exports = router;