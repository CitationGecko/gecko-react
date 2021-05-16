const _ = require('lodash');
const axios = require('axios');

const API_ROOT = 'https://api.zotero.org';

function getHeaders(data) {
  return {
    // 'User-Agent': 'CitationGecko',
    'Zotero-API-Key': data.userApiKey
  };
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
 * @param params.userApiKey
 */
function getUser(params) {
  return axios
    .get(`${API_ROOT}/keys/${params.userApiKey}`, { headers: getHeaders(params) })
    .then(response => response.data);
}

/**
 * @param params.userId
 * @param params.userApiKey
 * @param params.aggregatedResults
 * @param params.offset
 */
function getCollections(params) {
  const limit = 100;

  if (!params.offset) {
    params.offset = 0;
  }

  params.aggregatedResults = params.aggregatedResults || [];

  return axios
    .get(`${API_ROOT}/users/${params.userId}/collections`, {
      headers: getHeaders(params),
      params: { limit, start: params.offset }
    })
    .then(response => response.data)
    .then(response => {
      const totalCollections = _.get(response, 'headers.total-results');
      var collections = _.map(response, 'data');

      if (response && response.error) {
        return response.message || 'Unknown error communicating with Zotero';
      }

      params.aggregatedResults = params.aggregatedResults.concat(collections);

      if (totalCollections > params.offset + limit) {
        params.offset += limit;
        return getCollections(params);
      }
      return params.aggregatedResults;
    });
}

function getContents(collectionID, params) {
  return axios
    .get(`${API_ROOT}/users/${params.userId}/collections/${collectionID}/items/top`, {
      headers: getHeaders(params)
    })
    .then(response => response.data);
}

/**
 * @param params.userId
 * @param params.userApiKey
 * @param params.collectionId
 */
function addItems(papers, collectionId, params) {
  if (!Array.isArray(papers) && typeof papers === 'object') {
    papers = [papers];
  }

  return axios
    .get(`${API_ROOT}/items/new`, {
      headers: getHeaders(params),
      params: { itemType: 'journalArticle' }
    })
    .then(response => response.data)
    .then(template => {
      const allPapersPayload = _.map(papers, paper =>
        insertPaperDataIntoTemplate(template, paper, collectionId)
      );
      return axios
        .post(`${API_ROOT}/users/${params.userId}/items`, allPapersPayload, {
          headers: getHeaders(params)
        })
        .then(resp => JSON.parse(resp));
    });
}

module.exports = {
  getUser,
  getCollections,
  getContents,
  addItems
};
