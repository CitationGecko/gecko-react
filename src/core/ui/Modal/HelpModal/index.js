import React, { useState } from 'react';
import styles from './styles.module.css';
import SecondarySquareButton from 'core/components/SecondarySquareButton';

const Help = () => {
  const [screen, setScreen] = useState(1);

  let image = null;

  switch (screen) {
    case 1:
      image = 'images/help/seed-papers.png';
      break;
    case 2:
      image = 'images/help/add-seed-papers.png';
      break;
    case 3:
      image = 'images/help/recommended-papers.png';
      break;
    case 4:
      image = 'images/help/grow-network.png';
      break;
    case 5:
      image = 'images/help/filtering.png';
      break;
    case 6:
      image = 'images/help/view-switch.png';
      break;
    case 7:
      image = 'images/help/direction-switch.png';
      break;
    case 8:
      image = 'images/help/highlight-node.png';
      break;
    default:
      image = null;
  }

  return (
    <React.Fragment>
      <div>
        <img className={styles.screenshot} src={image} alt="helpful screenshot" />
      </div>
      <div className={styles.container}>
        {screen > 1 && (
          <SecondarySquareButton text="Previous" onClick={() => setScreen(screen => screen - 1)} />
        )}
        {screen < 8 && (
          <SecondarySquareButton text="Next" onClick={() => setScreen(screen => screen + 1)} />
        )}
      </div>
      <div className={styles.footer}>
        CitationGecko is OpenSource. If you are interested in building upon it checkout the{' '}
        <a href="https://github.com/CitationGecko/gecko-react">Github Repo</a>.
      </div>
    </React.Fragment>
  );
};

export default Help;
