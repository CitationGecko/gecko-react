import { useContext, useState } from 'react';
import { Store } from 'core/state/data';

export const OpenCitations = () => {
  const { Papers, updatePapers } = useContext(Store);
  const [requests, setState] = useState([]);
  let toQuery = Object.values(Papers).filter(p => p.seed && p.doi && !requests[p.doi]);
  if (toQuery.length) {
    const newRequests = toQuery.reduce((curr, next) => ({ ...curr, [next.doi]: 'pending' }), {});
    setState({ ...requests, ...newRequests });
    toQuery.forEach(paper => {
      getCitations(paper).then(updatedPaper => updatePapers([updatedPaper]));
    });
  }
  return null;
};

export function getCitations(paper) {
  let url = `https://w3id.org/oc/index/api/v1/citations/${paper.doi}`;
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

export default OpenCitations;
