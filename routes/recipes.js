const express = require('express');
const router = express.Router();
const recipeControllers = require('../controllers/recipes');
const catchAsync = require('../helpers/catchAsync');
const { isCreator, validateRecipe, isLoggedIn } = require('../middleware');

router.get('/', catchAsync(recipeControllers.viewAllRecipesPage));

router.get('/new', isLoggedIn, recipeControllers.viewNewRecipePage);            

router.post('/', isLoggedIn, validateRecipe, catchAsync (recipeControllers.createNewRecipeData));

router.get('/:id', catchAsync (recipeControllers.viewRecipeDetailsPage));

router.get('/:id/edit', isLoggedIn, isCreator, catchAsync(recipeControllers.viewEditRecipePage));

router.put('/:id', isLoggedIn, isCreator, validateRecipe, catchAsync (recipeControllers.editRecipeData));

router.delete('/:id', isLoggedIn, isCreator, catchAsync(recipeControllers.deleteRecipeData));

module.exports = router;