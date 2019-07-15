import cookies from 'browser-cookies';
import React from 'react';
import { addImportModule } from 'core/module-loader';
import ZoteroImportModal from './ZoteroImportModal';

addImportModule({
  buttonText: 'Import from Zotero',
  modal: <ZoteroImportModal />
});

export function authenticate() {
  const apiKey = cookies.get('gecko_zotero_key');
  let url = `/services/zotero/login/?key=${apiKey}`;
  return fetch(url).then(resp => resp.json());
}

export function getCollections() {
  let url = '/services/zotero/getCollections';
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      if (json.success) {
        return json.data;
      } else {
        alert(json.message);
      }
    });
}

export function getItems(collectionID) {
  let url = `/services/zotero/getItemsInCollection/?collectionId=${collectionID}`;
  return fetch(url)
    .then(resp => resp.json())
    .then(json => {
      return json.data.map(a => {
        let item = a.data;
        return {
          title: item.title,
          author: item.creators.length > 0 ? item.creators[0].lastName : 'n.a',
          year: new Date(item.date).getFullYear(),
          journal: item.journalAbbreviation || item.journal,
          doi: item.DOI
        };
      });
    });
}
