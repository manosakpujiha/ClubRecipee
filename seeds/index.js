const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const seedrecipes = require('./data');

mongoose.connect('mongodb+srv://vercel-admin-user:ed50OwKR4gNd8UFN@cluster0.0y17h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('Connected to MongoDB');
});

const seedDb = async () => {
    await Recipe.deleteMany({});
    await Recipe.insertMany(seedrecipes);
    // await r.save();
    console.log('Database seeded with recipes!');
}
seedDb().then(() => {
    mongoose.connection.close();
    console.log('Connection closed');
});