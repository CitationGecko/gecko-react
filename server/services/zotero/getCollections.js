const _ = require('lodash');
const Zotero = require('./lib/zotero');

function ZoteroGetCollectionsRoute(req, res) {
  const opts = {
    userId: _.get(req.session, 'auth.zotero.userID'),
    userApiKey: _.get(req.session, 'auth.zotero.accessToken')
  };
  if (!opts.userId || !opts.userApiKey) {
    return res.json({
      success: false,
      message: 'Authenticate with Zotero through /services/zotero/login'
    });
  }

  Zotero.getCollections(opts).then(collectionsData => {
    return res.json({ success: true, data: collectionsData });
  });
}

module.exports = ZoteroGetCollectionsRoute;
