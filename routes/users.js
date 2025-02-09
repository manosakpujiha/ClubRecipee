const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../helpers/catchAsync');

const userControllers = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.get('/register', userControllers.viewRegisterPage);

router.post('/register', catchAsync(userControllers.registerUser));

router.get('/login', userControllers.viewLoginPage);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userControllers.loginUser);

router.get('/logout', userControllers.logoutUser); 

module.exports = router;