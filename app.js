const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

mongoose.connect('mongodb+srv://vercel-admin-user:ed50OwKR4gNd8UFN@cluster0.0y17h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// module.exports = app; 