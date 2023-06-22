const Recipe = require('../models/recipe');

// exports.getHomePage = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 6;
//     const skip = (page - 1) * limit;

//     const recipes = await Recipe.find({})
//       .sort({ date: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate('user');

//     const totalRecipes = await Recipe.countDocuments();
//     const totalPages = Math.ceil(totalRecipes / limit);

//     res.render('home/index', { recipes, page, totalPages });
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'Error loading home page');
//     res.redirect('/');
//   }
// };
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

    recipes = await populateFavoritesWithUser(recipes);

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