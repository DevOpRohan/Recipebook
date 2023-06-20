const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();

router.get('/toggle/:recipeId', ensureAuthenticated, favoritesController.toggleFavorite);

module.exports = router;