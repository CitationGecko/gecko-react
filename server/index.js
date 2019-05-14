const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(path.dirname(__dirname), 'build')));

app.get('/ping', function(req, res) {
  return res.send('pong');
});

app.get('/', function(req, res) {
  res.sendFile(path.join(path.dirname(__dirname), 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log('CitationGecko server listening...'));
