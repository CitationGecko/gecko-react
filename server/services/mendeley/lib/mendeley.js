const _ = require('lodash');
const request = require('request-promise');

const API_ROOT = 'https://api.mendeley.com';

function getHeaders(params) {
  return {
    Authorization: `Bearer ${params.userToken}`
  };
}

function getProfile(params) {
  const url = API_ROOT + '/profile/me';
  const opts = {
    url: url,
    method: 'GET',
    headers: getHeaders(params)
  };
  return request(opts).then(resp => JSON.parse(resp));
}

function getFolders(params) {
  const url = API_ROOT + '/folders?limit=500';
  const opts = {
    url: url,
    method: 'GET',
    headers: getHeaders(params)
  };
  return request(opts).then(JSON.parse);
}

function getDocumentsInFolder(folderID, params) {
  const opts = {
    url: API_ROOT + '/folders/' + folderID + '/documents?limit=500',
    method: 'GET',
    headers: getHeaders(params)
  };

  return request(opts).then(resp => JSON.parse(resp));
}

function getDocument(id, params) {
  const opts = {
    url: API_ROOT + '/documents/' + id,
    method: 'GET',
    headers: getHeaders(params)
  };

  return request(opts).then(resp => JSON.parse(resp));
}

function getAllDocuments(params) {
  const opts = {
    url: API_ROOT + '/documents/',
    method: 'GET',
    headers: getHeaders(params)
  };

  return request(opts).then(resp => JSON.parse(resp));
}

function addDocuments(papers, folderId, data) {}

module.exports = {
  getProfile,
  getFolders,
  getDocument,
  getDocumentsInFolder,
  addDocuments
};
