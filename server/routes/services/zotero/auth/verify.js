// http://localhost:3000/auth/zotero/verify
const _ = require('lodash');
const ZoteroOAuthClient = require('./config').OAuthClient;

function AuthZoteroVerifyRoute(req, res) {
  const oauthVerifier = req.query.oauth_verifier;
  if (!oauthVerifier) {
    return res.send('Invalid verifier signature.');
  }

  const token = req.query.oauth_token;
  const secret = req.session.secret;
  console.log(secret);
  console.log(token);
  console.log(req.session.token);

  return ZoteroOAuthClient.getOAuthAccessToken(
    token,
    secret,
    oauthVerifier,
    (err, accessToken, accessTokenSecret, results) => {
      if (err) {
        console.log(err);
        _.set(req.session, 'auth.zotero', null);
        return res.send("Couldn't obtain valid access token from Zotero.");
      }

      _.set(req.session, 'auth.zotero.accessToken', accessToken);
      if (typeof results === 'object') {
        _.set(req.session, 'auth.zotero.userID', results.userID);
        _.set(req.session, 'auth.zotero.username', results.username);
      }

      console.log('req.session', req.session);
      return res.redirect('/');
    }
  );
}

module.exports = AuthZoteroVerifyRoute;
