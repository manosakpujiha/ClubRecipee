const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewCreator } = require('../middleware');
const Recipe = require('../models/recipe');
const Review = require('../models/reviews');
const catchAsync = require('../helpers/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const review = new Review(req.body.review);
    review.creator = req.user._id;
    recipe.reviews.push(review);
    await Promise.all([review.save(), recipe.save()]);
    req.flash('success', 'New review created!');
    res.redirect(`/recipes/${recipe._id}`);
}));
router.delete('/:reviewId', isLoggedIn, isReviewCreator, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/recipes/${id}`);
}));
module.exports = router;