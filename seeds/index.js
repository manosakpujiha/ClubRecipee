const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const seedrecipes = require('./data');


// const MONGODB_URI = `mongodb+srv://manosakpujiha:UrXx4YCTKpaANGFk@clubrecipee-cluster.1x1x0.mongodb.net/?retryWrites=true&w=majority&appName=clubrecipee-clusterclub-recipee` 
// mongoose.connect(MONGODB_URI, {
//     dbName: 'club-recipee', // Explicitly specify the database name
// });  // Seed to MongoDB Atlas

mongoose.connect('mongodb://127.0.0.1:27017/club-recipee') // Seed to local database

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('Connected to MongoDB');
});

const seedDb = async () => {
    await Recipe.deleteMany({});
    await Recipe.insertMany(seedrecipes);
    console.log('Database seeded with recipes!');
}

seedDb().then(() => {
    mongoose.connection.close();
    console.log('Connection closed');
});