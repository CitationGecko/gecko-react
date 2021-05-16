const axios = require('axios');

const API_ROOT = 'https://api.mendeley.com';

function getHeaders(params) {
  return {
    Authorization: `Bearer ${params.userToken}`
  };
}

function getProfile(params) {
  return axios
    .get(`${API_ROOT}/profile/me`, { headers: getHeaders(params) })
    .then(response => response.data);
}

function getFolders(params) {
  return axios
    .get(`${API_ROOT}/folders?limit=500`, { headers: getHeaders(params) })
    .then(response => response.data);
}

function getDocumentsInFolder(folderID, params) {
  return axios
    .get(`${API_ROOT}/folders/${folderID}/documents?limit=500`, {
      headers: getHeaders(params)
    })
    .then(response => response.data);
}

function getDocument(id, params) {
  return axios
    .get(`${API_ROOT}/documents/${id}`, {
      headers: getHeaders(params)
    })
    .then(response => response.data);
}

function getAllDocuments(params) {
  return axios
    .get(`${API_ROOT}/documents/`, {
      headers: getHeaders(params)
    })
    .then(response => response.data);
}

function addDocument(params, folderID, documentID) {
  return axios
    .post(
      `${API_ROOT}/folders/${folderID}/documents`,
      { id: documentID },
      {
        headers: getHeaders(params)
      }
    )
    .then(response => response.data);
}

module.exports = {
  getProfile,
  getFolders,
  getDocument,
  getAllDocuments,
  getDocumentsInFolder,
  addDocument
};
