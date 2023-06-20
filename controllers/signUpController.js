const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.getSignUp = (req, res) => {
  res.render('signUp/index');
};

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signUp/index', { errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};