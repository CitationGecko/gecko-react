require('dotenv').config();

const OAuth = require('oauth');

const APP_ID = process.env.API_MENDELEY_APP_ID;
const APP_SECRET = process.env.API_MENDELEY_APP_SECRET;
const APP_URL = process.env.APP_URL;

const endpoints = {
  accessToken: 'https://api.mendeley.com/oauth/token',
  authorize: 'https://api.mendeley.com/oauth/authorize',
  callbackUrl: APP_URL + '/services/mendeley/verify'
};

const OAuthClient = new OAuth.OAuth2(
  APP_ID,
  APP_SECRET,
  'https://api.mendeley.com/',
  'oauth/authorize',
  'oauth/token'
);

module.exports = {
  OAuthClient,
  endpoints,
  client_id: APP_ID
};
