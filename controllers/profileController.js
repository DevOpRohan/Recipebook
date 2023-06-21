const User = require('../models/user');
const Recipe = require('../models/recipe');

exports.getProfile = (req, res) => {
  res.render('profile/index', { user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.redirect('/users/profile');;
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const profileUser = await User.findById(req.params.userId);
    const recipes = await Recipe.find({ user: profileUser.id }).populate('user');
    res.locals.profileUser = profileUser; // Add this line
    res.render('users/profile', { profileUser, recipes });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading user profile');
    res.redirect('/');
  }
};