const renderPath = (path, res, next) => res.render(path, (error, html) => {
  if (!error) {
    res.set({ 'Content-type': 'text/html; charset=utf-8' });
    return res.end(html);
  }
  if (!error.message.startsWith('template not found')) {
    return next(error);
  }
  if (!path.endsWith('/index')) {
    return renderPath(`${path}/index`, res, next);
  }
  return next();
});

module.exports = (req, res, next) => {
  let path = req.path.substr(1);

  if (path === '') {
    path = 'index';
  }

  path = path.replace('docs', 'docs/views');

  return renderPath(path, res, next);
};
