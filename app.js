const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD 
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
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});
app.get('/recipes/new', async (req, res) => {
    const recipe = new Recipe(req.body.recipe);
    await recipe.save();
    res.redirect(`/recipes/${recipe._id}`);
});
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/show', { recipe });
});
app.post('/recipes', async (req, res) => {
    console.log(req.body);
    res.send(req.body);

    // const recipe = new Recipe(req.body.recipe);
    // await recipe.save();
    // res.redirect(`/recipes/${recipe._id}`);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// module.exports = app; 