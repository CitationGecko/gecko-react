import React, { useState } from 'react';

import ListFilter from 'core/ui/LeftPanel/components/ListFilter';
import ListSort from 'core/ui/LeftPanel/components/ListSort';

import styles from './styles.module.css';
import Icon from 'core/components/Icon';

function ListSettings({ onClose }) {
  return (
    <React.Fragment>
      {/*<ListSort />*/}
      <ListFilter />
      <div className={styles['collapse-bar']} onClick={onClose}>
        <Icon icon="expand_less" />
      </div>
    </React.Fragment>
  );
}

export default ListSettings;
