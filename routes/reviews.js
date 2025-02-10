const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewControllers = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewCreator } = require('../middleware');
const catchAsync = require('../helpers/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewControllers.createReviewData));
router.delete('/:reviewId', isLoggedIn, isReviewCreator, catchAsync(reviewControllers.deleteReviewData));
module.exports = router;