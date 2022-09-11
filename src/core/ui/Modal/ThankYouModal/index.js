import React, { useContext } from 'react';
import styles from './styles.module.css';
import PrimarySquareButton from 'core/components/PrimarySquareButton';
import StartModal from 'core/ui/Modal/StartModal';
import { UI } from 'core/state/ui';

const ThankYouModal = () => {
  const { setModal } = useContext(UI);
  return (
    <React.Fragment>
      <h1> Thank You for Using CitationGecko!</h1>
      <p>
        CitationGecko is a tool I built to fill an unmet need I had when doing the literature review
        for my PhD. Unfortunately, I am no longer actively developing CitationGecko.
      </p>
      <p>
        Thankfully there now exists a fantastic alternative with even more features! If you are
        interested in literature discovery and visualisation through citation networks please check
        out the excellent tool by the great team at <a href="https://www.litmaps.com/">Litmaps</a>.
      </p>
      <div className={styles['main-button']}>
        <a href="https://www.litmaps.com/">
          <PrimarySquareButton text={'Go to Litmaps!'} />
        </a>
      </div>
      <p>
        If you want to keep using CitationGecko, feel free! Just{' '}
        <u className={styles['secondary']} onClick={() => setModal(<StartModal />)}>
          click here to start exploring your literature.
        </u>
      </p>
      <p>
        CitationGecko is OpenSource. If you are interested in building upon it checkout the{' '}
        <a href="https://github.com/CitationGecko/gecko-react">Github Repo</a>.
      </p>
    </React.Fragment>
  );
};

export default ThankYouModal;
