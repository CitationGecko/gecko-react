const qs = require('query-string');
const { endpoints, client_id } = require('./lib/auth');

const query = {
  client_id,
  redirect_uri: endpoints.callbackUrl,
  response_type: 'code',
  scope: 'all'
};

const AUTH_URL = qs.stringifyUrl({ url: endpoints.authorize, query });

module.exports = (req, res) => {
  return res.redirect(AUTH_URL);
};
