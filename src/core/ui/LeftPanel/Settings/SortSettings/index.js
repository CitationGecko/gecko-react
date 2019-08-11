import React, { useContext } from 'react';

import styles from './styles.module.css';
import Dropdown from 'core/components/Dropdown';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Filters } from 'core/state/filters';

function SortSettings({ applyFilters }) {
  const { sortFields, activeSortField, setActiveSortField } = useContext(Filters);
  return (
    <div className={styles['sort']}>
      <span>Sort Papers by:</span>
      <Dropdown value={activeSortField} options={sortFields} onChange={setActiveSortField} />
      <IconButton>
        <Icon>swap_vert</Icon>
      </IconButton>
    </div>
  );
}

export default SortSettings;
