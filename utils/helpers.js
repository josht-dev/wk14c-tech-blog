module.exports = {
  // Format the createdAt date/time
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  // Check if 2 variables equal in handlebars
  ifEquals: (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }

    return options.inverse(this);
  }
};