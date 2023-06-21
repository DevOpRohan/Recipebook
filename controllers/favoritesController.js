// const Recipe = require('../models/recipe');
// const Favorite = require('../models/favorite');

// exports.toggleFavorite = async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.recipeId);
//     const favorite = await Favorite.findOne({ user: req.user.id, recipe: recipe.id });

//     if (favorite) {
//       await Favorite.deleteOne({ _id: favorite._id });
//     } else {
//       const newFavorite = new Favorite({ user: req.user.id, recipe: recipe.id });
//       await newFavorite.save();
//     }

//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'Error toggling favorite');
//     res.redirect('/');
//   }
// };

const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');

exports.toggleFavorite = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const favorite = await Favorite.findOne({ user: req.user.id, recipe: recipe.id });

    if (favorite) {
      await Favorite.deleteOne({ _id: favorite._id });
    } else {
      const newFavorite = new Favorite({ user: req.user.id, recipe: recipe.id });
      await newFavorite.save();
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error toggling favorite');
    res.redirect('/');
  }
};


exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('recipe');
    res.render('favorites/index', { favorites });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading favorites');
    res.redirect('/');
  }
};
