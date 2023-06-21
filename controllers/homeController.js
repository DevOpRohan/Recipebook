const Recipe = require('../models/recipe');

exports.getHomePage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');

    const totalRecipes = await Recipe.countDocuments();
    const totalPages = Math.ceil(totalRecipes / limit);

    res.render('home/index', { recipes, page, totalPages });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading home page');
    res.redirect('/');
  }
};