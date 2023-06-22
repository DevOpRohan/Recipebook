const Recipe = require('../models/recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({}).populate('user');
    res.render('recipes/index', { recipes });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading recipes');
    res.redirect('/');
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('user');
    res.render('recipes/show', { recipe });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading recipe');
    res.redirect('/recipes');
  }
};

exports.editRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/login');
    }
    res.render('recipes/edit', { recipe });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading recipe');
    res.redirect('/recipes/edit');
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/login');
    }
    Object.assign(recipe, req.body);
    await recipe.save();
    req.flash('success_msg', 'Recipe updated successfully');
    res.redirect('/recipes/my');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error updating recipe');
    res.redirect('/recipes/edit');
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe.user.toString() !== req.user.id) {
      req.flash('error_msg', 'Not authorized');
      return res.redirect('/recipes/login');
    }
    await Recipe.deleteOne({ _id: req.params.id }); // Update this line
    req.flash('success_msg', 'Recipe deleted successfully');
    res.redirect('/recipes/my');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error deleting recipe');
    res.redirect('/recipes/my');
  }
};

exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).populate('user'); // Filter recipes based on the logged-in user
    res.render('recipes/index', { recipes });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading recipes');
    res.redirect('/');
  }
};