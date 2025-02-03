const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { recipeSchema, reviewSchema } = require('./validationSchemas');
const catchAsync = require('./helpers/catchAsync');
const ExpressError = require('./helpers/ExpressError');
const method = require('method-override');
const Recipe = require('./models/recipe');
const Review = require('./models/reviews');
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? `${process.env.MONGODB_URI_PROD}club-recipee`
    : 'mongodb://127.0.0.1:27017/club-recipee';
mongoose.connect(MONGODB_URI, {
    dbName: 'club-recipee', // Explicitly specify the database name
    
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('Connected to MongoDB');
});

const app = express();
const port = process.env.PORT || 3000;
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(method('_method'));

const validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}   
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/recipes', catchAsync(async (req, res, next) => {
        const recipes = await Recipe.find({});
        res.render('recipes/index', { recipes });
}));
app.get('/recipes/new', (req, res) => {
    res.render('recipes/new');
});
app.post('/recipes', validateRecipe, catchAsync (async (req, res, next) => {
        // if (!req.body.recipe) throw new ExpressError('Invalid Recipe Data manos', 400);
        const recipe = new Recipe(req.body.recipe);
        await recipe.save();
        res.redirect(`/recipes/${recipe._id}`);
}));
app.get('/recipes/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('reviews');
    console.log(recipe);
    res.render('recipes/details', { recipe });
}));
app.get('/recipes/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/edit', { recipe });
}));
app.put('/recipes/:id', validateRecipe, catchAsync (async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe }, { new: true });
    res.redirect(`/recipes/${recipe._id}`);
}));
app.delete('/recipes/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}));
app.post('/recipes/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const review = new Review(req.body.review);
    recipe.reviews.push(review);
    await Promise.all([review.save(), recipe.save()]);
    res.redirect(`/recipes/${recipe._id}`);
}));
app.delete('/recipes/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Recipe.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/recipes/${id}`);
}));

app.all('*', (req, res, next) => {
    // res.send('404!!');
    next(new ExpressError('Page Not Found manos', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500}  = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong manos!!';
    res.status(statusCode).render('error', { err });
    // res.send('oops 404 manos!!');
    // res.render('404');
    // res.status(404).render('404');

});

app.listen(port, () => {
    console.log(`Server is running on port ${port} manos`);
});
module.exports = app; 