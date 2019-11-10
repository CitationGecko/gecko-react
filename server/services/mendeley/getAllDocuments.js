const _ = require('lodash');
const { getAllDocuments, getDocument } = require('./lib/mendeley');

module.exports = (req, res) => {
  const folderId = req.query.folderId;

  const opts = {
    userToken: req.cookies.gecko_mendeley_key || _.get(req.session, 'auth.mendeley.accessToken')
  };

  if (!folderId) {
    return res.json({ success: false, message: 'Unspecified folderId query param' });
  }

  if (!opts.userToken) {
    return res.json({
      success: false,
      message: 'Authenticate with Mendeley through /services/mendeley/login'
    });
  }

  getAllDocuments(folderId, opts)
    .then(docs => {
      return Promise.all(docs.map(doc => getDocument(doc.id, opts)));
    })
    .then(data => {
      return res.json(data);
    });
};
