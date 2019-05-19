import React, { useContext } from 'react';
import styles from './styles.module.css';
import SecondarySquareButton from 'components/Generic/SecondarySquareButton';
import { UI } from 'state/ui';

const AddSeedsModal = () => {
  const { openModal } = useContext(UI);
  const actions = [
    {
      text: 'Import from Zotero',
      action: () => openModal('zotero')
    },
    {
      text: 'Import from Mendeley',
      action: () => openModal('mendeley')
    },
    {
      text: 'Import from BibTex',
      action: () => openModal('bibtex')
    },
    {
      text: 'Search for Papers',
      action: () => openModal('seedSearch')
    }
  ];

  const buttons = actions.map((b, i) => {
    return <SecondarySquareButton key={i} onClick={b.action} text={b.text} />;
  });

  return (
    <React.Fragment>
      <div className={styles['large-button-list']}>{buttons}</div>
    </React.Fragment>
  );
};

export default AddSeedsModal;
