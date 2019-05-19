const _ = require('lodash');
const Zotero = require('./lib');

function ZoteroGetCollectionsRoute(req, res) {
  const opts = {
    userId: _.get(req.session, 'auth.zotero.userID'),
    userApiKey: _.get(req.session, 'auth.zotero.accessToken')
  };

  if (!opts.userId || !opts.userApiKey) {
    return res.json({
      success: false,
      message: 'Authenticate with Zotero through /services/zotero/auth/login'
    });
  }

  Zotero.getCollections(opts, (collectionsErr, collectionsData) => {
    return res.json({ success: true, data: collectionsData });
  });
}

module.exports = ZoteroGetCollectionsRoute;
