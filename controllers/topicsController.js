// const Recipe = require('../models/recipe');

// exports.getAllTopics = async (req, res) => {
//   try {
//     const topicsAggregation = await Recipe.aggregate([
//       {
//         $group: {
//           _id: { $toLower: '$topic' },
//           recipes: { $push: '$$ROOT' },
//         },
//       },
//     ]);

//     const topics = topicsAggregation.map((topic) => topic._id);
//     const recipesByTopic = {};

//     for (const topicAggregation of topicsAggregation) {
//       const topic = topicAggregation._id;
//       const recipes = await Promise.all(
//         topicAggregation.recipes.map(async (recipe) => {
//           const populatedRecipe = await Recipe.populate(recipe, 'user');
//           return populatedRecipe;
//         })
//       );
//       recipesByTopic[topic] = recipes;
//     }

//     res.render('topics/index', { topics, recipesByTopic });
//   } catch (err) {
//     console.error(err);
//     req.flash('error_msg', 'Error loading topics');
//     res.redirect('/');
//   }
// };
// controllers/topicsController.js
const Recipe = require('../models/recipe');
const User = require('../models/user');

exports.getAllTopics = async (req, res) => {
  try {
    const topicsAggregation = await Recipe.aggregate([
      {
        $group: {
          _id: { $toLower: '$topic' },
          recipes: { $push: '$$ROOT' },
        },
      },
    ]);

    const topics = topicsAggregation.map((topic) => topic._id);
    const recipesByTopic = {};

    for (const topicAggregation of topicsAggregation) {
      const topic = topicAggregation._id;
      let recipes = await Promise.all(
        topicAggregation.recipes.map(async (recipe) => {
          const populatedRecipe = await Recipe.populate(recipe, 'user');
          return populatedRecipe;
        })
      );

      if (req.user) {
        recipes = recipes.map((recipe) => {
          if (req.user.favorites.length > 0) {
            recipe.isFavorite = req.user.favorites.some((favoriteRecipe) => {
              return favoriteRecipe._id.toString() === recipe._id.toString();
            });
          } else {
            recipe.isFavorite = false;
          }
          recipe.favoriteData = recipe.isFavorite ? 'true' : 'false';
          return recipe;
        });
      }

      recipesByTopic[topic] = recipes;
    }

    res.render('topics/index', { topics, recipesByTopic });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading topics');
    res.redirect('/');
  }
};