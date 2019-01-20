import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import { importBibTex } from '../../../integrations/bibtex';
import { newPapers } from '../../../state';

class UploadBibTexModal extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Upload BibTex</h1>
        <div>
          <input type="file" id="files" name="files[]" multiple onChange={this.props.onSelect} />
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
    onSelect: e => {
      let papers = importBibTex(e);
      dispatch(newPapers(papers));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadBibTexModal);
