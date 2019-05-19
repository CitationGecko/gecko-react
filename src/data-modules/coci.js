import { store } from 'state/data';
import { requestSent, updatePapers } from 'state/actions';

store.subscribe(handleStateChange);

function handleStateChange() {
  let allPapers = Object.values(store.getState().data.Papers);
  let toQuery = allPapers.filter(p => p.seed && !p.coci && p.doi);
  if (toQuery.length) {
    store.dispatch(requestSent(toQuery, 'coci'));
    toQuery.forEach(paper => {
      getCitations(paper).then(updatedPaper => store.dispatch(updatePapers([updatedPaper])));
    });
  }
}

export function getCitations(paper) {
  let url = `https://w3id.org/oc/index/coci/api/v1/citations/${paper.doi}`;
  return fetch(url, {
    headers: {
      Accept: 'application/sparql-results+json'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      return parseResponse(data, paper);
    });
}

export function parseResponse(response, paper) {
  const updatedPaper = {
    ...paper,
    citations: response.map(edge => {
      return {
        doi: edge.citing
      };
    })
  };
  return updatedPaper;
}
