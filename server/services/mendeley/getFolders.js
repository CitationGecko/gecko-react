const _ = require('lodash');
const { getFolders } = require('./lib/mendeley');

module.exports = (req, res) => {
  const opts = {
    userToken: req.cookies.gecko_mendeley_key || _.get(req.session, 'auth.mendeley.accessToken')
  };
  if (!opts.userToken) {
    return res.redirect('/services/mendeley/authenticate');
  }
  console.log(opts);
  getFolders(opts)
    .then(foldersData => {
      return res.json(foldersData);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send('Authenticate with Mendeley');
    });
};
