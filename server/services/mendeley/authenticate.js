const { endpoints, OAuthClient } = require('./lib/auth');

const AUTH_URL =
  'https://api.mendeley.com/oauth/authorize?client_id=7425&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fservices%2Fmendeley%2Fverify&response_type=code&scope=all';

module.exports = (req, res) => {
  return res.redirect(AUTH_URL);
};
