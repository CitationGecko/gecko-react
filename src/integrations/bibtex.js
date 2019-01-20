import bibtexParse from 'vendor/bibtexParse';
// Import / Export Bibtex

function makeBibtexEntry(p) {
  return {
    citationKey: p.author + p.year,
    entryType: 'ARTICLE',
    entryTags: {
      title: p.title,
      year: p.year,
      author: p.author,
      doi: p.doi,
      journal: p.journal
    }
  };
}

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
  for (var i = 0, f; (f = files[i]); i++) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const papers = bibtexParse.toJSON(e.target.result);
      const newPapers = papers.filter(p => p.entryTags.doi).map(parseBibtexEntry);
      if (!newPapers.length) {
        alert(
          "We couldn't find any DOIs in the BibTex you uploaded please check your export settings"
        );
      }
      console.log(newPapers);
    };
    reader.readAsText(f);
  }
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

export function exportBibtex(name, papers) {
  papers = papers.map(makeBibtexEntry);
  const bibtex = bibtexParse.toBibtex(papers);
  download(name, bibtex);
}

function download(filename, text) {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
