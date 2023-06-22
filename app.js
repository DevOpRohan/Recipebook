const express = require('express');
const session = require('express-session');
const passport = require('passport');
const ejs = require('ejs');
const path = require('path');
const flash = require('connect-flash');
const connectDB = require('./config/database');
const methodOverride = require('method-override');

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Passport config
require('./config/passport')(passport);

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(flash());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables for flash messages and user
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.errors = req.flash('errors');
  res.locals.user = req.user || null;
  res.locals.profileUser = null;
  next();
});

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static('assets'));

// Routes
const mainRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const topicRoutes = require('./routes/topics');
const favoriteRoutes = require('./routes/favorites');

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/topics', topicRoutes);
app.use('/favorites', favoriteRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));