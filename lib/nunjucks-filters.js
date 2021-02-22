const filters = require('../app/filters');

module.exports = (env) => ({
  log(obj) {
    const nunjucksSafe = env.getFilter('safe');
    return nunjucksSafe(`<script>console.log(${JSON.stringify(obj, null, '\t')});</script>`);
  },
  ...filters(env),
});
