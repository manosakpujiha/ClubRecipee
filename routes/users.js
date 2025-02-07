const express = require('express');
const router = express.Router();
const { storeReturnTo } = require('../middleware');
const passport = require('passport');
const catchAsync = require('../helpers/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to Club Recipee ${username}!`);
            res.redirect('/recipes');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));
router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/recipes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get('/logout', (req, res, next) => {
    const { username } = req.user;
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', `Goodbye ${username}!`);
        res.redirect('/recipes');
    });
}); 

module.exports = router;