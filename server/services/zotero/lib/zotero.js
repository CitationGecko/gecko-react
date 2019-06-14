const _ = require('lodash');
const request = require('request-promise');

const API_ROOT = 'https://api.zotero.org';

function getUser(data) {
  const opts = {
    url: API_ROOT + '/keys/' + data.userApiKey,
    method: 'GET',
    headers: getHeaders(data)
  };

  return request(opts).then(resp => JSON.parse(resp));
}

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
function getCollections(data) {
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

  return request(opts).then(response => {
    const parsedBody = JSON.parse(response);
    const totalCollections = _.get(response, 'headers.total-results');
    var collections = _.map(parsedBody, 'data');

    if (parsedBody && parsedBody.error) {
      return parsedBody.message || 'Unknown error communicating with Zotero';
    }

    data.aggregatedResults = data.aggregatedResults.concat(collections);

    if (totalCollections > data.offset + limit) {
      data.offset += limit;
      return getCollections(data);
    }
    return data.aggregatedResults;
  });
}

function getContents(collectionID, data) {
  const opts = {
    url: API_ROOT + '/users/' + data.userId + '/collections/' + collectionID + '/items/top',
    method: 'GET',
    headers: getHeaders(data)
  };

  return request(opts).then(resp => JSON.parse(resp));
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
function addItems(papers, collectionId, data) {
  if (!Array.isArray(papers) && typeof papers === 'object') {
    papers = [papers];
  }

  const url = 'https://api.zotero.org/items/new?itemType=journalArticle';
  const templateOpts = {
    url: url,
    method: 'GET',
    headers: getHeaders(data)
  };

  request(templateOpts).then(resp => {
    const template = JSON.parse(resp);
    const allPapersPayload = _.map(papers, paper =>
      insertPaperDataIntoTemplate(template, paper, collectionId)
    );
    const opts = {
      url: API_ROOT + '/users/' + data.userId + '/items',
      method: 'POST',
      headers: getHeaders(data),
      body: JSON.stringify(allPapersPayload)
    };
    return request(opts).then(resp => JSON.parse(resp));
  });
}

module.exports = {
  getUser,
  getCollections,
  getContents,
  addItems
};
