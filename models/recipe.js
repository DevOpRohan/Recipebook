const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
  },
  category: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favorite',
    },
  ],

  favoritesCount: {
    type: Number,
    default: 0,
  },

});

module.exports = mongoose.model('Recipe', RecipeSchema);