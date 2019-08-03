import React from 'react';

import styles from './styles.module.css';
import Dropdown from 'core/components/Dropdown';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

function ListSort({ applyFilters }) {
  const options = ['Seeds Cited By'];
  return (
    <div className={styles['sort']}>
      <span>Sort Papers by:</span>
      <Dropdown options={options} />
      <IconButton>
        <Icon>swap_vert</Icon>
      </IconButton>
    </div>
  );
}

export default ListSort;
