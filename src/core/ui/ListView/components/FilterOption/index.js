import React, { useContext } from 'react';

import Dropdown from 'core/components/Dropdown';

import styles from './styles.module.css';
import { IconButton } from '@material-ui/core';
import Icon from 'core/components/Icon';
import TextInput from 'core/components/TextInput';

function FilterOption({ filter, filters, setPendingFilter, clearPendingFilter }) {
  const setValue = value => setPendingFilter({ value });
  const setField = field =>
    setPendingFilter({ field, option: Object.keys(filters[field].options)[0] });
  const setOption = option => setPendingFilter({ option });
  return (
    <div className={styles['container']}>
      <Dropdown value={filter.field} options={Object.keys(filters)} onChange={setField} />
      <Dropdown
        value={filter.option}
        options={Object.keys(filters[filter.field].options)}
        onChange={setOption}
      />
      <TextInput value={filter.value} onChange={setValue} />
      <IconButton color="red" disableRipple={true} onClick={clearPendingFilter}>
        <Icon icon="close" />
      </IconButton>
    </div>
  );
}

export default FilterOption;
