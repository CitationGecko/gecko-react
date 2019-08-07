import React from 'react';
import { parsePaper } from 'data-modules/crossref';
import { addImportModule } from 'core/module-loader';
import SeedSearchModal from './SeedSearchModal';

addImportModule({
  buttonText: 'Search for Papers',
  modal: <SeedSearchModal />
});

export function crossrefSearch(input) {
  let query = input.replace(' ', '+');
  let url = `https://api.crossref.org/works?query=${query}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      return json.message.items.map(parsePaper);
    });
}
