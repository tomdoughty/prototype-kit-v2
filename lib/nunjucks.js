const nunjucks = require('nunjucks');

const nunjucksFunctions = require('./nunjucks-functions');
const nunjucksFilters = require('./nunjucks-filters');

module.exports = (app, views = []) => {
  app.set('view engine', 'html');

  const env = nunjucks.configure([
    ...views,
    './app/views',
    './shared/views',
    'node_modules/nhsuk-frontend/packages/components',
  ], {
    autoescape: true,
    express: app,
    watch: true,
  });

  Object.entries(nunjucksFunctions(env)).forEach(([name, func]) => {
    env.addGlobal(name, func);
  });

  Object.entries(nunjucksFilters(env)).forEach(([name, filter]) => {
    env.addFilter(name, filter);
  });
};
