import { store } from 'state/store';
import { seedSearchPending, seedSearchComplete } from 'state/actions';
import { parsePaper } from '../data-modules/crossref';

store.subscribe(handleStateChange);

function handleStateChange() {
  let search = store.getState().search;
  if (search.status === 'submitted') {
    store.dispatch(seedSearchPending());
    crossrefSearch(search.query).then(papers => {
      store.dispatch(seedSearchComplete(papers));
    });
  }
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
