const Recipe = require('../models/recipe');

exports.getNewRecipe = (req, res) => {
  res.render('create/new');
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      topic: req.body.topic,
      category: req.body.category,
      difficulty: req.body.difficulty,
      time: req.body.time,
    });

    await newRecipe.save();
    req.flash('success_msg', 'Recipe created successfully');
    res.redirect('/recipes/my');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Error creating recipe');
    res.redirect('/create/new');
  }
};