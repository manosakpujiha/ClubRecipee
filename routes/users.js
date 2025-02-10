const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../helpers/catchAsync');
const userControllers = require('../controllers/users');
const { storeReturnTo } = require('../middleware');

router.route('/register')
    .get(userControllers.viewRegisterPage)
    .post(catchAsync(userControllers.registerUser));

router.route('/login')
    .get(userControllers.viewLoginPage)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userControllers.loginUser);

router.get('/logout', userControllers.logoutUser); 

module.exports = router;