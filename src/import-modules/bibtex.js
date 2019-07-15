import bibtexParse from 'vendor/bibtexParse';
// Import Bibtex

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
  return fetch(url)
    .then(resp => resp.text())
    .then(data => {
      const papers = bibtexParse.toJSON(data);
      const newPapers = papers.filter(p => p.entryTags.doi).map(parseBibtexEntry);
      return newPapers;
    });
}
