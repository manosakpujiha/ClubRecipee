const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb://127.0.0.1:27017/club-recipee')
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('Connected to MongoDB');
});

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makerecipe', async (req, res) => {
    const recipe = new Recipe({
        title: 'Pancakes',
        description: 'A delicious breakfast treat',
        ingredients: '1 cup flour, 1 cup milk, 1 egg',
        instructions: 'Mix ingredients, cook on griddle',
        preptime: 10,
        servings: 4
    })
    await recipe.save();
    res.send('Recipe created!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// module.exports = app; 