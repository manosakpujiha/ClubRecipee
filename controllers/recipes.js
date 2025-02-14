const recipeModel = require('../models/recipe');

module.exports.viewAllRecipesPage = async (req, res, next) => {
    const recipes = await recipeModel.find({}).populate('creator');
    res.render('recipes/index', { recipes });
}
module.exports.viewNewRecipePage = (req, res) => {
    res.render('recipes/new');
}

module.exports.createNewRecipeData = async (req, res, next) => {
    console.log('MAnos****************************************************req.body:', req.body);
    console.log('MAnos****************************************************req.files:', req.files);
    try {
        const recipe = new recipeModel(req.body.recipe);
        recipe.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        recipe.creator = req.user._id;
        console.log('MAnos****************************************************recipe:', recipe);
        await recipe.save();
        req.flash('success', 'New recipe created!');
        res.redirect(`/recipes/${recipe._id}`);
    } catch (e) {
        console.error(e);
        req.flash('error', 'Something went wrong. Please try again.');
    }
}

module.exports.viewRecipeDetailsPage = async (req, res) => {
    const { id } = req.params;
    const recipe = await recipeModel.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'creator'
        }
    }).populate('creator');
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
    const recipe = await recipeModel.findByIdAndUpdate(id, { ...req.body.recipe }, { new: true });
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