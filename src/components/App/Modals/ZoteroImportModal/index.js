import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
//import { importZotero } from 'import-modules/zotero';
import { updatePapers, closeModal } from 'state/actions';
import logo from './new-logo.svg';
import SecondaryButton from 'components/Generic/SecondaryButton';

class ZoteroImportModal extends Component {
  render() {
    return (
      <div>
        <img className={styles.centered} src={logo} alt="zotero-logo" />
        <div className={styles.centered}>
          <SecondaryButton
            text="Connect to Zotero"
            onClick={() => {
              window.location.href = window.location.href + 'services/zotero/auth/login';
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoteroImportModal);
