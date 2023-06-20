const Recipe = require('../models/recipe');

exports.getHomePage = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).sort({ date: -1 }).limit(10).populate('user');
    res.render('home/index', { recipes });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading home page');
    res.redirect('/');
  }
};