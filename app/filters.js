module.exports = (env) => ({
  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:
    sayHi: (name) => {
        return 'Hi ' + name + '!'
    }
    Which in your templates would be used as:
    {{ 'Paul' | sayHi }} => 'Hi Paul'
    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.
    Filters can take additional arguments, for example:
    sayHi: (name, tone) => {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }
    Which would be used like this:
    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'
    For more on filters and how to write them see the Nunjucks
    documentation.
  ------------------------------------------------------------------ */
  sayHi: (name, tone) => `${tone === 'formal' ? 'Greetings' : 'Hi'} ${name}!`,
});
