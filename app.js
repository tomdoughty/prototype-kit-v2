require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const basicAuth = require('express-basic-auth');
const cookieSession = require('cookie-session');

const nunjucks = require('./lib/nunjucks');

// Middleware
const storeData = require('./middleware/store-data');
const customRoutes = require('./app/routes');
const docsRoutes = require('./docs/routes');
const redirectPosts = require('./middleware/redirect-posts');
const autoRouting = require('./middleware/auto-routing');
const validation = require('./middleware/validation');
const attachLocals = require('./middleware/attach-locals');

// Environment variables
const {
  BASIC_AUTH_USER,
  BASIC_AUTH_PASSWORD,
  ENABLE_DOCS,
  PORT,
} = process.env;

// Initialise express app
const app = express();
const docsApp = express();

// Setup Nunjucks
nunjucks(app);

// Initialiase basic auth middleware
app.use(basicAuth({
  challenge: true,
  users: {
    [BASIC_AUTH_USER]: BASIC_AUTH_PASSWORD,
  },
}));

// Set middleware for form processing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Set cookie session for data storing
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  name: 'session',
  secret: 'prototype-session',
}));

// Serve assets from NHS.UK frontend
app.use(express.static('./app/assets/dist'));

// Clear data on /clear-data route
app.get('/clear-data', (req, res) => {
  req.session.data = {};
  return res.redirect('/');
});

// Store data
app.use(storeData);

// Attach any locals for views
app.use(attachLocals);

// Validate form data
app.use(validation);

if (ENABLE_DOCS) {
  // Initialise docs as separate app to handle views more easily
  app.use('/docs', docsApp);
  nunjucks(docsApp, ['./docs/views']);
  docsApp.use(storeData);
  docsApp.use(docsRoutes);
}

// Use custom application routes
app.use(customRoutes);

// Redirect POST requests to GET requests to avoid resubmission errors
app.post(redirectPosts);

// Pass request to autorouting middleware if not matched to other routes
app.use(autoRouting);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error(`Page not found: ${req.path}`);
  err.status = 404;
  return next(err);
});

// Display error
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500);
  return res.send(err.message);
});

// Run the application
app.listen(PORT || 3000);
