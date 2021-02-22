module.exports = (req, _, next) => {
  // Handle checkboxes when all are unchecked
  Object.entries(req.body).forEach(([key, values]) => {
    if (Array.isArray(values)) {
      // Get true checked values by removing hidden inputs
      const checked = values.filter((value) => value !== '_unchecked');
      // If there are checked values reset checkbox object to them
      if (checked.length) {
        req.body[key] = checked;
      } else {
        // If no values are checked remove checkbox object from body and session
        delete req.body[key];
        delete req.session.data[key];
      }
    }
  });

  // Set session to existing data, body and query params
  req.session.data = {
    ...req.session.data,
    ...req.body,
    ...req.query,
  };

  return next();
};
