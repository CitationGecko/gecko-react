import { store, updatePapers, updateEdges } from '../state';

store.subscribe(async function() {
  let allPapers = Object.values(store.getState().papers);
  let toQuery = allPapers.filter(p => !p.crossref);
  if (toQuery.length) {
    let updatedPapers = (await getMetadata(toQuery)).map(parsePaper);
    let seedPapers = updatedPapers.filter(paper => paper.seed && paper.references);
    let references = seedPapers.map(p => p.references.map(parseReference));
    store.dispatch(updatePapers(updatedPapers));
    updatedPapers
      .filter(paper => paper.seed && paper.references)
      .forEach(async paper => {
        console.log(`CrossRef found ${paper.references.length} citations for ${paper.doi}`);
        let newPapers = paper.references.map(parseReference);
        newPapers = await getMetadata(newPapers);
        newPapers = newPapers.map(parsePaper);
        store.dispatch(updatePapers(newPapers));
        let newEdges = newPapers.map(p => {
          return {
            source: paper,
            target: p,
            crossref: true
          };
        });
        store.dispatch(updateEdges(newEdges));
      });
  }
});

export function getMetadata(papers) {
  let dois = papers.filter(p => p.doi);
  if (dois.length) {
    let query = dois.map(p => `doi:${p.doi}`).join();
    let base = 'https://api.crossref.org/works?rows=1000&filter=';
    return fetch(base + query)
      .then(resp => resp.json())
      .then(json => {
        return json.message.items;
      });
  } else {
    return [];
  }
}

export function crossrefSearch(input) {
  let query = input.replace(' ', '+');
  let url = `https://api.crossref.org/works?query=${query}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      const items = json.message.items.map(parsePaper);
    });
}

function parsePaper(response) {
  let date = response['published-print'] ? response['published-print'] : response['created'];

  return {
    doi: response.DOI,
    title: response.title ? response.title[0] : 'unavailable',
    author: response.author ? response.author[0].family : '',
    month: date['date-parts'][0][1],
    year: date['date-parts'][0][0],
    timestamp: new Date(date['date-time']),
    journal: response['container-title'] ? response['container-title'][0] : '',
    citationCount: response['is-referenced-by-count'],
    references: response['reference'] ? response['reference'] : false,
    crossref: true
  };
}

function parseReference(ref) {
  return {
    doi: ref.DOI ? ref.DOI : null,
    title: ref['article-title'] ? ref['article-title'] : 'unavailable',
    author: ref.author ? ref.author : null,
    year: ref.year ? ref.year : null,
    journal: ref['journal-title'] ? ref['journal-title'] : null
  };
}
