const _ = require('lodash');
const request = require('request');

const API_ROOT = 'https://api.zotero.org';

function getHeaders(data) {
  return {
    // 'User-Agent': 'CitationGecko',
    'Zotero-API-Key': data.userApiKey
  };
}

/**
 * @param data.userId
 * @param data.userApiKey
 * @param data.aggregatedResults
 * @param data.offset
 */
function getCollections(data, callback) {
  const limit = 100;

  if (!data.offset) {
    data.offset = 0;
  }

  const url =
    API_ROOT + '/users/' + data.userId + '/collections?limit=' + limit + '&start=' + data.offset;

  const opts = {
    url: url,
    method: 'GET',
    headers: getHeaders(data)
  };

  data.aggregatedResults = data.aggregatedResults || [];

  return request(opts, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    const parsedBody = JSON.parse(body);
    const totalCollections = _.get(response, 'headers.total-results');
    var collections = _.map(parsedBody, 'data');

    if (parsedBody && parsedBody.error) {
      return callback(parsedBody.message || 'Unknown error communicating with Zotero');
    }

    data.aggregatedResults = data.aggregatedResults.concat(collections);

    if (totalCollections > data.offset + limit) {
      data.offset += limit;
      return getCollections(data, callback);
    }

    return callback(null, data.aggregatedResults);
  });
}

function getContents(collectionID, data, callback) {
  const opts = {
    url: API_ROOT + '/users/' + data.userId + '/collections/' + collectionID + '/items/top',
    method: 'GET',
    headers: getHeaders(data)
  };

  return request(opts, (error, response, body) => {
    if (error) {
      return callback(error);
    }

    const parsedBody = JSON.parse(body);
    return callback(null, parsedBody);
  });
}

function insertPaperDataIntoTemplate(template, paper, collectionId) {
  template.DOI = paper.doi;
  template.title = paper.title;
  template.publicationTitle = paper.journal;
  template.date = paper.year;
  template.creators[0].lastName = paper.author;
  template.collections = [collectionId];

  return template;
}

/**
 * @param data.userId
 * @param data.userApiKey
 * @param data.collectionId
 */
function addItems(papers, collectionId, data, callback) {
  if (!Array.isArray(papers) && typeof papers === 'object') {
    papers = [papers];
  }

  const url = 'https://api.zotero.org/items/new?itemType=journalArticle';
  const templateOpts = {
    url: url,
    method: 'GET',
    headers: getHeaders(data)
  };

  request(templateOpts, (templateErr, templateResponse, templateBody) => {
    const template = JSON.parse(templateBody);
    const allPapersPayload = _.map(papers, paper =>
      insertPaperDataIntoTemplate(template, paper, collectionId)
    );

    const opts = {
      url: API_ROOT + '/users/' + data.userId + '/items',
      method: 'POST',
      headers: getHeaders(data),
      body: JSON.stringify(allPapersPayload)
    };

    request(opts, (error, response, body) => {
      if (error) {
        return callback(error);
      }
      console.log(body);
      return callback(null, body);
    });
  });
}

module.exports = {
  getCollections,
  getContents,
  addItems
};
