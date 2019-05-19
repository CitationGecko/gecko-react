import { store } from 'state/data';
import { requestSent, updatePapers } from 'state/actions';

store.subscribe(handleStateChange);

function handleStateChange() {
  let allPapers = Object.values(store.getState().data.Papers);
  let toQuery = allPapers.filter(p => !p.crossref && p.doi);
  if (toQuery.length) {
    store.dispatch(requestSent(toQuery, 'crossref'));
    getMetadata(toQuery)
      .then(resp => resp.map(parsePaper))
      .then(papers => store.dispatch(updatePapers(papers)));
  }
}

export function getMetadata(papers) {
  //split into groups of 50
  let chunks = chunkArray(papers, 50);
  let results = chunks.map(singleCrossRefRequest);
  return Promise.all(results)
    .then(res => {
      return res.flat();
    })
    .catch(e => {
      console.log(e);
      return results.filter(Array.isArray).flat();
    });
}

function singleCrossRefRequest(papers) {
  let query = papers.map(p => `doi:${p.doi}`).join();
  let base = 'https://api.crossref.org/works?rows=1000&filter=';
  return fetch(base + query)
    .then(resp => resp.json())
    .then(json => {
      return json.message.items;
    });
}

export function crossrefSearch(input) {
  let query = input.replace(' ', '+');
  let url = `https://api.crossref.org/works?query=${query}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      return json.message.items.map(parsePaper);
    });
}

export function parsePaper(response) {
  let date = response['published-print'] ? response['published-print'] : response['created'];

  return {
    doi: response.DOI,
    title: response.title ? response.title[0].replace(/<\/?[^>]+(>|$)/g, '') : null,
    author: response.author ? response.author[0].family : '',
    month: date['date-parts'][0][1],
    year: date['date-parts'][0][0],
    timestamp: new Date(date['date-time']),
    journal: response['container-title'] ? response['container-title'][0] : '',
    citationCount: response['is-referenced-by-count'],
    references: response['reference'] ? response['reference'].map(parseReference) : false,
    crossref: true
  };
}

export function parseReference(ref) {
  return {
    doi: ref.DOI ? ref.DOI : null,
    title: ref['article-title'] ? ref['article-title'].replace(/<\/?[^>]+(>|$)/g, '') : null,
    author: ref.author ? ref.author : null,
    year: ref.year ? ref.year : null,
    journal: ref['journal-title'] ? ref['journal-title'] : null
  };
}

function chunkArray(myArray, chunk_size) {
  let results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}
