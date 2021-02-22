const locals = require('../app/locals');
const sessionDataDefaults = require('../app/session-data-defaults');

module.exports = (req, res, next) => {
  // Attach session data to locals for views
  res.locals = {
    ...locals,
    data: {
      ...sessionDataDefaults,
      ...req.session.data,
    },
    ...req.session.errors,
  };

  return next();
};
