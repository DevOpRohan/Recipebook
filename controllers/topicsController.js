const Recipe = require('../models/recipe');

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
      const recipes = await Promise.all(
        topicAggregation.recipes.map(async (recipe) => {
          const populatedRecipe = await Recipe.populate(recipe, 'user');
          return populatedRecipe;
        })
      );
      recipesByTopic[topic] = recipes;
    }

    res.render('topics/index', { topics, recipesByTopic });
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error loading topics');
    res.redirect('/');
  }
};