const { validationResult } = require('express-validator');
const appRules = require('../app/validation');
const docsRules = require('../docs/validation');

const rules = {
  ...docsRules,
  ...appRules,
};

// Default object to be passed to every request object
const defaultErrorState = {
  errorList: [],
  errors: {},
  hasErrors: false,
};

// Middleware to apply rules to passed request object
const applyRules = async (req, _, next) => {
  // Run validation on POST requests
  if (req.method === 'POST') {
    // Retrieve rules based on URL
    const ruleSet = rules[req.originalUrl] || [];
    // Run rules async... this allows us to run the rules async within a
    // single middleware rather than inline for each route
    await Promise.all(ruleSet.map(async (rule) => rule.run(req)));
  }
  return next();
};

// Transform error data for use in nhsuk-frontend templates
const transformErrors = (req, _, next) => {
  // Set errors to session for use in Nunjucks templates
  req.session.errors = validationResult(req)
    .array()
    .reduce(({ errorList, errors }, { param, msg }) => ({
    // Array of objects with href and text properties
      errorList: [
        ...errorList,
        {
          href: `#${param}`,
          text: msg,
        },
      ],
      // Object of errors with { param , msg }
      errors: {
        ...errors,
        [param]: msg,
      },
      // Set error flag to true
      hasErrors: true,
    }), defaultErrorState);

  return next();
};

// Redirect request back to referer URL for less jarring URL change
const redirectToReferer = (req, res, next) => {
  if (req.session.errors.hasErrors) {
    // Retrieve referer path from request object
    const { pathname } = new URL(req.get('referer'));
    return res.redirect(pathname);
  }

  return next();
};

// Middleware to apply rules, make them available in templates and handle routing
const validation = [applyRules, transformErrors, redirectToReferer];

module.exports = validation;
