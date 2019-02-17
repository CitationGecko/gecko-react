import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from 'state/actions';
import styles from './styles.module.css';
import OnboardingModal from './OnboardingModal';
import AddSeedsModal from './AddSeedsModal';
import UploadBibTexModal from './UploadBibTexModal';
import SeedSearchModal from './SeedSearchModal';

class Modal extends Component {
  render() {
    if (!this.props.modal) return null;

    const modals = {
      onboarding: <OnboardingModal />,
      addSeeds: <AddSeedsModal />,
      bibtex: <UploadBibTexModal />,
      seedSearch: <SeedSearchModal />
    };

    const ModalContent = modals[this.props.modal] ? (
      modals[this.props.modal]
    ) : (
      <h1>Feature Coming Soon...</h1>
    );

    return (
      <div className={styles['modal']} onClick={this.props.onClose}>
        <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
          {ModalContent}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => {
      dispatch(closeModal());
    }
  };
};

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);

export default ModalContainer;
