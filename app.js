const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const method = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const reviewRoutes = require('./routes/reviews');

const MONGODB_URI = process.env.VERCEL_ENV === 'production' 
    ? `${process.env.MONGODB_URI_PROD}club-recipee`
    : 'mongodb://127.0.0.1:27017/club-recipee';
mongoose.connect(MONGODB_URI, {
    dbName: 'club-recipee',
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
app.use(express.static(path.join(__dirname, 'public')));
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }   
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/recipes/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home');
});
app.all('*', (req, res, next) => {
    next(res.render('404'));
});
app.use((err, req, res, next) => {
    const { statusCode = 500}  = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong manos!!';
    res.status(statusCode).render('error', { err });
    
});
app.listen(port, () => {
    console.log(`Server is running on port ${port} manos`);
});
module.exports = app; 