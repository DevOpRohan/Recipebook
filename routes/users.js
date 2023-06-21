const { validationResult } = require('express-validator');
const express = require('express');
const passport = require('passport');
const signUpController = require('../controllers/signUpController');
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');

const { ensureAuthenticated } = require('../middlewares/auth');
const { check } = require('express-validator');
const router = express.Router();

router.get('/signup', signUpController.getSignUp);
router.post(
  '/signup',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  signUpController.createUser
);

router.get('/login', loginController.getLogin);
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
  ],
  loginController.postLogin
);


router.get('/profile', ensureAuthenticated, profileController.getProfile);
router.post('/profile', ensureAuthenticated, profileController.updateProfile);


router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

// router.get('/:userId/profile', ensureAuthenticated, profileController.getUserProfile);
router.get('/profile/:userId',  profileController.getUserProfile);

module.exports = router;