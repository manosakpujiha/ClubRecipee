const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const seedrecipes = require('./data');

mongoose.connect('mongodb+srv://manosakpujiha:UrXx4YCTKpaANGFk@clubrecipee-cluster.1x1x0.mongodb.net/club-recipee');

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