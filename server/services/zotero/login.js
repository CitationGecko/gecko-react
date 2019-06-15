const _ = require('lodash');
const Zotero = require('./lib/zotero');

function ZoteroLoginRoute(req, res) {
  return Zotero.getUser({ userApiKey: req.query.key }).then(user => {
    _.set(req.session, 'auth.zotero.accessToken', req.query.key);
    _.set(req.session, 'auth.zotero.userID', user.userID);
    return res.send({ success: true, data: { user } });
  });
}

module.exports = ZoteroLoginRoute;
