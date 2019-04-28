import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { importBibTex } from 'import-modules/bibtex';
import { updatePapers, closeModal } from 'state/actions';

class UploadBibTexModal extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Upload BibTex</h1>
        <div>
          <input type="file" accept=".bib" onChange={this.props.onSelect} />
          <output />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSelect: async e => {
      let papers = await importBibTex(e);
      dispatch(updatePapers(papers, true));
      dispatch(closeModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadBibTexModal);
