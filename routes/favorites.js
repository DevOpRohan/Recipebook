// const express = require('express');
// const { ensureAuthenticated } = require('../middlewares/auth');
// const favoritesController = require('../controllers/favoritesController');
// const router = express.Router();

// router.get('/toggle/:recipeId', ensureAuthenticated, favoritesController.toggleFavorite);

// module.exports = router;

const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();

router.get('/', ensureAuthenticated, favoritesController.getFavorites);
router.get('/toggle/:recipeId', ensureAuthenticated, favoritesController.toggleFavorite);

module.exports = router;