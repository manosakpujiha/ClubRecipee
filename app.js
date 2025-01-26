const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const method = require('method-override');
const Recipe = require('./models/recipe');
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? `${process.env.MONGODB_URI_PROD}club-recipee`
    : 'mongodb://127.0.0.1:27017/club-recipee';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('Connected to MongoDB');
});

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(method('_method'));
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});
app.get('/recipes/new', (req, res) => {
    res.render('recipes/new');
});
app.post('/recipes', async (req, res) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
});
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/show', { recipe });
});
app.get('/recipes/:id/edit', async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/edit', { recipe });
});
app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    res.redirect(`/recipes/${recipe._id}`);
});
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app; 