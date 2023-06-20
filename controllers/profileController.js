const User = require('../models/user');

exports.getProfile = (req, res) => {
  res.render('profile/index', { user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};