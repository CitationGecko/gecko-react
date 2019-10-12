import React from 'react';
import cookies from 'browser-cookies';
import { addImportModule } from 'core/module-loader';
import MendeleyImportModal from './MendeleyImportModal';

addImportModule({
  buttonText: 'Import from Mendeley',
  modal: <MendeleyImportModal />
});

export function authenticate() {
  let url = `/services/mendeley/authenticate`;
  return fetch(url);
}

export function getFolders() {
  let url = `/services/mendeley/getFolders`;
  return fetch(url).then(resp => resp.json());
}

export function getDocumentsInFolder(folderID) {
  let url = `/services/mendeley/getDocumentsInFolder/?folderId=${folderID}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      return json.map(doc => {
        return {
          title: doc.title,
          abstract: doc.abstract,
          author: doc.authors.length > 0 ? doc.authors[0].last_name : 'n.a',
          year: doc.year,
          journal: doc.source,
          doi: doc.identifiers ? doc.identifiers.doi : null
        };
      });
    });
}
