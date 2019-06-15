const ZoteroAuthLib = require('./lib/auth');

const ZoteroEndpoints = ZoteroAuthLib.endpoints;
const ZoteroOAuthClient = ZoteroAuthLib.OAuthClient;

function ZoteroAuthRoute(req, res) {
  return ZoteroOAuthClient.getOAuthRequestToken((err, token, tokenSecret, parsedQueryString) => {
    if (err) {
      return res.send("Couldn't obtain valid request token from Zotero.");
    }

    req.session.token = token;
    req.session.secret = tokenSecret;

    if (parsedQueryString.oauth_callback_confirmed !== 'true') {
      return res.send("Couldn't get OAuth callback confirmation from Zotero.");
    }

    const redirectUrl = `${ZoteroEndpoints.authorize}?oauth_token=${token}&write_access=1`;
    // redirect to Zotero to authenticate & authorise app
    return res.redirect(redirectUrl);
  });
}

module.exports = ZoteroAuthRoute;
