const _ = require('lodash');
const { addDocuments } = require('./lib/mendeley');

module.exports = (req, res) => {
  const body = JSON.parse(req.body);
  const collectionId = body.collectionId;
  const documents = body.documents;

  const opts = {
    userId: _.get(req.session, 'auth.mendeley.userID'),
    userApiKey: _.get(req.session, 'auth.mendeley.accessToken')
  };

  if (!collectionId) {
    return res.json({ success: false, message: 'Unspecified collectionId query param' });
  }

  if (!opts.userId || !opts.userApiKey) {
    return res.json({
      success: false,
      message: 'Authenticate with Mendeley through /services/mendeley/login'
    });
  }

  addDocuments(documents, collectionId, opts).then(data => {
    return res.json({ success: true, data: data });
  });
};
