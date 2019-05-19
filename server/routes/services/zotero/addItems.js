const _ = require('lodash');
const Zotero = require('./lib');

function ZoteroAddItemRoute(req, res) {
  const body = JSON.parse(req.body);
  const collectionId = body.collectionId;
  const items = body.items;

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
      message: 'Authenticate with Zotero through /services/zotero/auth/login'
    });
  }

  Zotero.addItems(items, collectionId, opts, (err, data) => {
    return res.json({ success: true, data: data });
  });
}

module.exports = ZoteroAddItemRoute;
