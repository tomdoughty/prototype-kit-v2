module.exports = (env) => ({
  checked(name, value) {
    if (this.ctx.data[name] && this.ctx.data[name].includes(value)) {
      return 'checked';
    } return null;
  },
});
