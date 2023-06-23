const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');
const User = require('../models/user');

// controllers/favoritesController.js
// exports.toggleFavorite = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.recipeId);
//     const favoriteIndex = req.user.favorites.findIndex(
//       (favoriteRecipeId) => favoriteRecipeId.toString() === recipe.id.toString()
//     );

//     if (favoriteIndex !== -1) {
//       await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipe._id } });
//       await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: -1 } });
//     } else {
//       await User.findByIdAndUpdate(req.user.id, { $push: { favorites: recipe._id } });
//       await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: 1 } });
//     }

//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'Error toggling favorite');
//     res.redirect('/');
//   }
// };

exports.toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const favoriteIndex = req.user.favorites.findIndex(
      (favoriteRecipeId) => favoriteRecipeId.toString() === recipe.id.toString()
    );

    if (favoriteIndex !== -1) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipe._id } });
      await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: -1 } });
    } else {
      await User.findByIdAndUpdate(req.user.id, { $push: { favorites: recipe._id } });
      await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: 1 } });
    }

    // Store the previous URL in a variable
    const previousUrl = req.header('Referer') || '/';

    // Redirect the user to the previous URL
    res.redirect(previousUrl);
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error toggling favorite');
    res.redirect('/');
  }
};

// controllers/favoritesController.js
exports.delete_favorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const favoriteIndex = req.user.favorites.findIndex(
      (favoriteRecipeId) => favoriteRecipeId.toString() === recipe.id.toString()
    );

    if (favoriteIndex !== -1) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipe._id } });
      await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: -1 } });
      req.flash('success_msg', 'Favorite removed successfully');
    } else {
      req.flash('error_msg', 'Recipe not found in favorites');
    }

    res.redirect('/favorites');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error removing favorite');
    res.redirect('/');
  }
};


exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.render('favorites/index', { favorites: user.favorites });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading favorites');
    res.redirect('/');
  }
};

// controllers/favoritesController.js
exports.toggleFavoriteAjax = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const favoriteIndex = req.user.favorites.findIndex(
      (favoriteRecipeId) => favoriteRecipeId.toString() === recipe.id.toString()
    );

    if (favoriteIndex !== -1) {
      await User.findByIdAndUpdate(req.user.id, { $pull: { favorites: recipe._id } });
      await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: -1 } });
    } else {
      await User.findByIdAndUpdate(req.user.id, { $push: { favorites: recipe._id } });
      await Recipe.findByIdAndUpdate(req.params.recipeId, { $inc: { favoritesCount: 1 } });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error_msg: 'Error toggling favorite' });
  }
};