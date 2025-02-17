const recipeModel = require('../models/recipe');

module.exports.viewAllRecipesPage = async (req, res, next) => {
    const recipes = await recipeModel.find({}).populate('creator');
    res.render('recipes/index', { recipes });
}
module.exports.viewNewRecipePage = (req, res) => {
    res.render('recipes/new');
}

module.exports.createNewRecipeData = async (req, res, next) => {
    res.send("it worked!");
    // const recipe = new recipeModel(req.body.recipe);
    // recipe.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // recipe.creator = req.user._id;
    // await recipe.save();
    // console.log(recipe);
    // req.flash('success', 'New recipe created!');
    // res.send('it worked!');
    // res.redirect(`/recipes/${recipe._id}`);
}

module.exports.viewRecipeDetailsPage = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'creator'
        }
    }).populate('creator');
    // console.log(recipe);
    if (!recipe) {
        req.flash('error', 'recipeModel not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/details', { recipe});
}

module.exports.viewEditRecipePage = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id);
    if (!recipe) {
        req.flash('error', 'recipeModel not found!');
        return res.redirect('/recipes');
    }
    res.render('recipes/edit', { recipe });
}

module.exports.editRecipeData = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.findByIdAndUpdate(id, { ...req.body.recipe });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    recipe.images.push(...imgs);
    await recipe.save();
    req.flash('success', 'recipeModel updated!');
    res.redirect(`/recipes/${recipe._id}`);
}

module.exports.deleteRecipeData = async (req, res) => {
    const { id } = req.params;
    await recipeModel.findByIdAndDelete(id);
    req.flash('success', 'recipeModel deleted!');
    res.redirect('/recipes');
}