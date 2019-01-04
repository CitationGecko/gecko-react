import React, { Component } from 'react';
import styles from './styles.module.css';
import Modal from '../Core/Modal';
import PrimarySquareButton from '../Core/PrimarySquareButton';

class OnboardingModal extends Component {
    render() {
      return (
       <Modal>
         <h1> Welcome to Gecko </h1>
          <p>
              Gecko is here to help you find the most relevant papers to your research and give you a more complete sense of the research landscape.
          </p>
          <p>
              Start from a small set of 'seed papers' that define an area you are interested. Gecko will search the citation network for connected papers allowing you to quickly identify important papers you may have missed.
          </p>
          <div className={styles['modal-footer']}>
            <PrimarySquareButton>
              Start discovering papers!
            </PrimarySquareButton>
          </div>
          <div><button className={styles['demo-button']}>show me an example!</button></div>
       </Modal>
      );
    }
  }
  
export default OnboardingModal;