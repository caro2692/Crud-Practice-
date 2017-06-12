// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/patterns_inv'
  },
  test: {
    client: 'pg',
    connection: 'postgresql://localhost/test_patterns_inv'
  }
};
