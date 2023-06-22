const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();

router.get('/', ensureAuthenticated, favoritesController.getFavorites);
router.get('/toggle/:recipeId', ensureAuthenticated, favoritesController.toggleFavorite);
router.get('/delete_favorite/:recipeId', ensureAuthenticated, favoritesController.delete_favorite);

module.exports = router;