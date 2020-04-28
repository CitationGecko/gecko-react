import React, { useEffect, useContext } from 'react';
import bibtexParse from 'third-party/bibtexParse';
import { addImportModule } from 'core/module-loader';
import UploadBibTexModal from './UploadBibTexModal';
import { UI } from 'core/state/ui';
import { Store } from 'core/state/data';
import { getQueryString } from 'utils';

export const BibTex = () => {
  const { setModal } = useContext(UI);
  const { updatePapers } = useContext(Store);
  useEffect(() => {
    let bibTexUrl = getQueryString('bib');
    if (bibTexUrl && bibTexUrl.endsWith('.bib')) {
      importBibTexFromUrl(bibTexUrl).then(papers => {
        updatePapers(papers, true);
        setModal(null);
      });
    }
  }, []);
  return null;
};

function parseBibtexEntry(p) {
  return {
    doi: p.entryTags.doi,
    title: p.entryTags.title.replace(/[{}]/g, '') || null,
    year: p.entryTags.year || null,
    journal: p.entryTags.journal || null
  };
}

export function importBibTex(evt) {
  const files = evt.target.files; // FileList object
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(files[0]);
  }).then(data => {
    const papers = bibtexParse.toJSON(data);
    const newPapers = papers.filter(p => p.entryTags.doi).map(parseBibtexEntry);
    return newPapers;
  });
}
// Importing Example BibTex
export function importExampleBibTex() {
  const url = `${window.location.href}examples/exampleBibTex.bib`;
  return importBibTexFromUrl(url);
}

export function importBibTexFromUrl(url) {
  return fetch(url)
    .then(resp => resp.text())
    .then(data => {
      const papers = bibtexParse.toJSON(data);
      const newPapers = papers.filter(p => p.entryTags.doi).map(parseBibtexEntry);
      return newPapers;
    });
}

addImportModule({
  buttonText: 'Import from Bibtex',
  modal: <UploadBibTexModal />,
  component: BibTex
});
