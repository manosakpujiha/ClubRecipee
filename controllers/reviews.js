const Recipe = require('../models/recipe');
const Review = require('../models/reviews');

module.exports.createReviewData = async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const review = new Review(req.body.review);
    review.creator = req.user._id;
    recipe.reviews.push(review);
    await Promise.all([review.save(), recipe.save()]);
    req.flash('success', 'New review created!');
    res.redirect(`/recipes/${recipe._id}`);
}

module.exports.deleteReviewData = async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted!');
    res.redirect(`/recipes/${id}`);
}