//controllers/homeController.js
const Recipe = require('../models/recipe');
const User = require('../models/user');

exports.getHomePage = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    let recipes = await Recipe.find({})
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user')
      .populate('favorites');

    // Print the favorites array for debugging
    if (req.user) {
      const user = await User.findById(req.user._id).populate({ path: 'favorites', model: 'Recipe' });
      req.user = user;
      console.log(req.user.favorites);
    }

    // Add favorite status for each recipe
    if (req.user) {
      recipes = recipes.map((recipe) => {
        if (req.user.favorites.length > 0) {
          recipe.isFavorite = req.user.favorites.some((favoriteRecipe) => {
            console.log('favoriteRecipe._id:', favoriteRecipe._id);
            console.log('recipe._id:', recipe._id);
            return favoriteRecipe._id.toString() === recipe._id.toString();
          });
        } else {
          recipe.isFavorite = false;
        }
        recipe.favoriteData = recipe.isFavorite ? 'true' : 'false';
        console.log('recipe.isFavorite:', recipe.isFavorite);
        return recipe;
      });
    }

    const totalRecipes = await Recipe.countDocuments();
    const totalPages = Math.ceil(totalRecipes / limit);

    res.render('home/index', { recipes, page, totalPages });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading home page');
    res.redirect('/');
  }
};
const populateFavoritesWithUser = async (recipes) => {
  return await Promise.all(
    recipes.map(async (recipe) => {
      const populatedFavorites = await Promise.all(
        recipe.favorites.map(async (favoriteId) => {
          const favorite = await Favorite.findById(favoriteId).populate('user');
          return favorite;
        })
      );
      recipe.favorites = populatedFavorites;
      return recipe;
    })
  );
};