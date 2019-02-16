import { Component } from 'react';
import { connect } from 'react-redux';
import { updatePapers, requestSent } from '../state';

class CrossRef extends Component {
  render() {
    if (this.props.papers.length) {
      this.props.requestMetadata(this.props.papers);
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    papers: Object.values(state.data.Papers).filter(p => !p.crossref && p.doi)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestMetadata: papers => {
      dispatch(requestSent(papers, 'crossref'));
      getMetadata(papers).then(papers => {
        dispatch(updatePapers(papers.map(parsePaper)));
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrossRef);

export function getMetadata(papers) {
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
      const items = json.message.items.map(parsePaper);
    });
}

export function parsePaper(response) {
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
    references: response['reference'] ? response['reference'].map(parseReference) : false,
    crossref: true
  };
}

export function parseReference(ref) {
  return {
    doi: ref.DOI ? ref.DOI : null,
    title: ref['article-title'] ? ref['article-title'] : 'unavailable',
    author: ref.author ? ref.author : null,
    year: ref.year ? ref.year : null,
    journal: ref['journal-title'] ? ref['journal-title'] : null
  };
}
