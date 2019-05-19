import React, { useContext } from 'react';
import styles from './styles.module.css';
import PrimarySquareButton from 'components/Generic/PrimarySquareButton';
import { importExampleBibTex } from 'import-modules/bibtex';
import { UI } from 'state/ui';
import { Store } from 'state/ui';

const OnboardingModal = () => {
  const { openModal, closeModal } = useContext(UI);
  const { updatePapers } = useContext(Store);
  return (
    <React.Fragment>
      <h1> Welcome to Gecko </h1>
      <p>
        Gecko is here to help you find the most relevant papers to your research and give you a more
        complete sense of the research landscape.
      </p>
      <p>
        Start from a small set of 'seed papers' that define an area you are interested. Gecko will
        search the citation network for connected papers allowing you to quickly identify important
        papers you may have missed.
      </p>
      <div className={styles['modal-footer']}>
        <PrimarySquareButton
          onClick={() => openModal('addsSeeds')}
          text={'Start discovering papers'}
        />
      </div>
      <div>
        <button
          className={styles['demo-button']}
          onClick={async () => {
            let papers = await importExampleBibTex();
            updatePapers(papers, true);
            closeModal();
          }}
        >
          show me an example!
        </button>
      </div>
    </React.Fragment>
  );
};

export default OnboardingModal;
