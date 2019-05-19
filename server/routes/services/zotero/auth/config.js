require('dotenv').config();

const OAuth = require('oauth');

const APP_KEY = process.env.API_ZOTERO_APP_KEY;
const APP_SECRET = process.env.API_ZOTERO_APP_SECRET;
const APP_URL = process.env.APP_URL;

const endpoints = {
  requestToken: 'https://www.zotero.org/oauth/request?write_access=1',
  accessToken: 'https://www.zotero.org/oauth/access?write_access=1',
  authorize: 'https://www.zotero.org/oauth/authorize',
  callbackUrl: APP_URL + '/services/zotero/auth/verify'
};

const OAuthClient = new OAuth.OAuth(
  endpoints.requestToken,
  endpoints.accessToken,
  APP_KEY,
  APP_SECRET,
  '1.0A',
  endpoints.callbackUrl,
  'HMAC-SHA1'
);

module.exports = {
  OAuthClient,
  endpoints
};
