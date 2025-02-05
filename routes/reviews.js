const express = require('express');
const router = express.Router({ mergeParams: true });
const Recipe = require('../models/recipe');
const Review = require('../models/reviews');
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const { reviewSchema } = require('../validationSchemas');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}   
router.post('/', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await Promise.all([review.save(), recipe.save()]);
    req.flash('success', 'New review created!');
    res.redirect(`/recipes/${recipe._id}`);
}));
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/recipes/${id}`);
}));
module.exports = router;