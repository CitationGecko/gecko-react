import React, { useContext, useEffect } from 'react';
import styles from './styles.module.css';
import PrimarySquareButton from 'core/components/PrimarySquareButton';
import SecondarySquareButton from 'core/components/SecondarySquareButton';
import ButtonList from 'core/components/ButtonList';
import { importExampleBibTex, importBibTexFromUrl } from 'import-modules/bibtex';
import AddSeedsModal from 'core/ui/Modal/AddSeedsModal';
import { UI } from 'core/state/ui';
import { Store } from 'core/state/data';
import { getQueryString } from 'utils';

const StartModal = () => {
  const { setModal } = useContext(UI);
  const { updatePapers } = useContext(Store);
  useEffect(() => {
    let bibTexUrl = getQueryString('bib');
    if (bibTexUrl && bibTexUrl.endsWith('.bib')) {
      importBibTexFromUrl(bibTexUrl).then(papers => {
        updatePapers(papers, true);
        setModal(null);
      });
    }
  }, []);
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
          onClick={() => setModal(<AddSeedsModal />)}
          text={'Start discovering papers'}
        />
      </div>
      <div>
        <button
          className={styles['demo-button']}
          onClick={async () => {
            let papers = await importExampleBibTex();
            updatePapers(papers, true);
            setModal(null);
          }}
        >
          show me an example!
        </button>
      </div>
    </React.Fragment>
  );
};

export default StartModal;
