const _ = require('lodash');
const { endpoints, OAuthClient } = require('./lib/auth');

module.exports = (req, res) => {
  OAuthClient.getOAuthAccessToken(
    req.query.code,
    { grant_type: 'authorization_code', redirect_uri: endpoints.callbackUrl },
    function(err, access_token, refresh_token, results) {
      if (err) {
        console.log(err);
        _.set(req.session, 'auth.mendeley', null);
        return res.send("Couldn't obtain valid access token from Mendeley.");
      } else if (results.error) {
        console.log(results);
        res.end(JSON.stringify(results));
      } else {
        _.set(req.session, 'auth.mendeley.accessToken', access_token);
        res.cookie('gecko_mendeley_key', access_token).send();
        return res.redirect('/');
      }
    }
  );
};
