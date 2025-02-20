const User = require('../models/user');

module.exports.viewRegisterPage = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
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
}

module.exports.viewLoginPage = (req, res) => {
    res.render('users/login');
}


module.exports.loginUser = (req, res) => {
    const { username } = req.user;
    req.flash('success', `Welcome back ${username}!`);
    const redirectUrl = res.locals.returnTo || '/recipes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res, next) => {
    const { username } = req.user;
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success', `Goodbye ${username}!`);
        res.redirect('/recipes');
    });
}