const _ = require('lodash');
const Zotero = require('./lib/zotero');

function ZoteroGetItemsInCollectionRoute(req, res) {
  const collectionId = req.query.collectionId;

  const opts = {
    userId: _.get(req.session, 'auth.zotero.userID'),
    userApiKey: _.get(req.session, 'auth.zotero.accessToken')
  };

  if (!collectionId) {
    return res.json({ success: false, message: 'Unspecified collectionId query param' });
  }

  if (!opts.userId || !opts.userApiKey) {
    return res.json({
      success: false,
      message: 'Authenticate with Zotero through /services/zotero/login'
    });
  }

  Zotero.getContents(collectionId, opts).then(collectionsData => {
    console.log(collectionsData);
    return res.json({ success: true, data: collectionsData });
  });
}

module.exports = ZoteroGetItemsInCollectionRoute;
