const { recipeSchema, reviewSchema } = require('./validationSchemas');
const Recipe = require('./models/recipe');
const Review = require('./models/reviews');
const ExpressError = require('./helpers/ExpressError');

module.exports.isLoggedIn = (req, res, next) => { 
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Wait a minute, you gotta sign in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isCreator = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe.creator.equals(req.user._id)) {
        req.flash('error', `You can not modify this recipe because you did not create it!`);
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

module.exports.isReviewCreator = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.creator.equals(req.user._id)) {
        req.flash('error', `You can not modify this review because you did not create it!`);
        return res.redirect(`/recipes/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}