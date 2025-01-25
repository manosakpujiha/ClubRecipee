const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? process.env.MONGODB_URI_PROD 
    : 'mongodb://127.0.0.1:27017/club-recipee';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// const MONGODB_URI = 'mongodb+srv://vercel-admin-user:ed50OwKR4gNd8UFN@cluster0.0y17h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://127.0.0.1:27017/club-recipee'
// mongoose.connect(`${MONGODB_URI}`);

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
app.get('/env', (req, res) => {
    console.log(process.env);
    res.send(process.env);
});

app.get('/recipes', async (req, res) => {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// module.exports = app; 