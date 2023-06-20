const passport = require('passport');
const { validationResult } = require('express-validator');

exports.getLogin = (req, res) => {
  res.render('login/index');
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('errors', errors.array());
    return res.redirect('/users/login');
  }
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};