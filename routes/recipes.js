// const express = require('express');
// const recipesController = require('../controllers/recipesController');
// const createController = require('../controllers/createController');
// const { ensureAuthenticated } = require('../middlewares/auth');
// const router = express.Router();

// router.get('/', recipesController.getAllRecipes);
// router.get('/:id', recipesController.getRecipeById);
// router.get('/create', ensureAuthenticated, createController.getNewRecipeForm);
// router.post('/create', ensureAuthenticated, createController.createRecipe);

// module.exports = router;



const express = require('express');
const { ensureAuthenticated } = require('../middlewares/auth');
const createController = require('../controllers/createController');
const recipesController = require('../controllers/recipesController');
const router = express.Router();

router.get('/new', ensureAuthenticated, createController.getNewRecipe);
router.post('/new', ensureAuthenticated, createController.createRecipe);

router.get('/', recipesController.getAllRecipes);
router.get('/:id', recipesController.getRecipe);
router.get('/:id/edit', ensureAuthenticated, recipesController.editRecipe);
router.put('/:id', ensureAuthenticated, recipesController.updateRecipe);
router.delete('/:id', ensureAuthenticated, recipesController.deleteRecipe); // Update this line

module.exports = router;