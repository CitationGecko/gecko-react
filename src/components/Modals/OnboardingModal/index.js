import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.module.css';
import PrimarySquareButton from 'components/Core/PrimarySquareButton';
import { openModal, updatePapers, closeModal } from '../../../state';
import { importExampleBibTex } from '../../../integrations/bibtex';

class OnboardingModal extends Component {
  render() {
    return (
      <React.Fragment>
        <h1> Welcome to Gecko </h1>
        <p>
          Gecko is here to help you find the most relevant papers to your research and give you a
          more complete sense of the research landscape.
        </p>
        <p>
          Start from a small set of 'seed papers' that define an area you are interested. Gecko will
          search the citation network for connected papers allowing you to quickly identify
          important papers you may have missed.
        </p>
        <div className={styles['modal-footer']}>
          <PrimarySquareButton onClick={this.props.clickStart} text={'Start discovering papers'} />
        </div>
        <div>
          <button className={styles['demo-button']} onClick={this.props.clickExample}>
            show me an example!
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clickStart: () => {
      dispatch(openModal('addSeeds'));
    },
    clickExample: async () => {
      let papers = await importExampleBibTex();
      dispatch(updatePapers(papers, true));
      dispatch(closeModal());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OnboardingModal);
