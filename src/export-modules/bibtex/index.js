import bibtexParse from 'third-party/bibtexParse';

function makeBibtexEntry(p) {
  return {
    citationKey: `gecko${p.ID}`,
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
